"use server"

import { z } from "zod"
import { and, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db/drizzle"
import {
  User,
  users,
  activityLogs,
  type NewActivityLog,
  ActivityType,
} from "@/lib/db/schema"
import { comparePasswords, hashPassword, setSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getUser } from "@/lib/db/queries"
import { validatedAction, validatedActionWithUser } from "@/lib/auth/middleware"
import { getClientIp } from "@/lib/get-ip"

async function logActivity(
  userId: number,
  type: ActivityType,
  ipAddress?: string
) {
  const newActivity: NewActivityLog = {
    userId,
    action: type,
    ipAddress: ipAddress || "",
  }
  await db.insert(activityLogs).values(newActivity)
}

const signInSchema = z.object({
  userName: z.string().min(3).max(25),
  password: z.string().min(6).max(100),
})

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const clientIp = await getClientIp()
  const { userName, password } = data

  const userWithTeam = await db
    .select({
      user: users,
    })
    .from(users)
    .where(eq(users.userName, userName))
    .limit(1)

  if (userWithTeam.length === 0) {
    return { error: "Invalid email or password. Please try again." }
  }

  const { user: foundUser } = userWithTeam[0]

  const isPasswordValid = await comparePasswords(password, foundUser.password)

  if (!isPasswordValid) {
    return { error: "Invalid email or password. Please try again." }
  }

  await Promise.all([
    setSession(foundUser),
    logActivity(foundUser.id, ActivityType.SIGN_IN, clientIp),
  ])

  redirect("/scpanel")
})

export async function signOut() {
  const clientIp = await getClientIp()
  const user = (await getUser()) as User

  // Kullanıcının çıkış aktivitesini kaydedin
  await logActivity(user.id, ActivityType.SIGN_OUT, clientIp)

  // Çerezleri temizleyin
  const cookieManager = cookies()
  ;(await cookieManager).delete("session")
}

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const clientIp = await getClientIp()
    const { currentPassword, newPassword } = data

    const isPasswordValid = await comparePasswords(
      currentPassword,
      user.password
    )

    if (!isPasswordValid) {
      return { error: "Current password is incorrect." }
    }

    if (currentPassword === newPassword) {
      return {
        error: "New password must be different from the current password.",
      }
    }

    const newPasswordHash = await hashPassword(newPassword)

    await Promise.all([
      db
        .update(users)
        .set({ password: newPasswordHash })
        .where(eq(users.id, user.id)),
      logActivity(user.id, ActivityType.UPDATE_PASSWORD, clientIp),
    ])

    return { success: "Password updated successfully." }
  }
)

const deleteAccountSchema = z.object({
  password: z.string().min(6).max(100),
})

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const clientIp = await getClientIp()
    const { password } = data

    const isPasswordValid = await comparePasswords(password, user.password)
    if (!isPasswordValid) {
      return { error: "Incorrect password. Account deletion failed." }
    }

    await logActivity(user.id, ActivityType.DELETE_ACCOUNT, clientIp)

    // Soft delete
    await db
      .update(users)
      .set({
        deletedAt: sql`CURRENT_TIMESTAMP`,
        userName: sql`CONCAT(userName, '-', id, '-deleted')`, // Ensure email uniqueness
      })
      .where(eq(users.id, user.id))
    ;(await cookies()).delete("session")
    redirect("/auth/login")
  }
)

const updateAccountSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  userName: z.string().min(3).max(25),
  isActivated: z
    .union([z.boolean(), z.string()])
    .transform((value) => value === true || value === "true")
    .optional()
    .default(true),
})

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const clientIp = await getClientIp()
    const { name, userName } = data

    const isActivated = data.isActivated === true

    await Promise.all([
      db
        .update(users)
        .set({ name, userName, isActivated })
        .where(eq(users.id, user.id)),
      logActivity(user.id, ActivityType.UPDATE_ACCOUNT, clientIp),
    ])

    return { success: "Account updated successfully." }
  }
)
