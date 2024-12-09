import { hashPassword } from "../auth/session"
import { db } from "./drizzle"
import { users } from "./schema"

async function seed() {
  const userName = process.env.NEXT_PUBLIC_ADMIN_USERNAME!
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!
  const passwordHash = await hashPassword(password)

  await db.insert(users).values([
    {
      userName: userName,
      password: passwordHash,
      image: "/dashboard/admin.png",
      isSuperUser: true,
    },
  ])

  console.log("Initial user created.")
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error)
    process.exit(1)
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...")
    process.exit(0)
  })
