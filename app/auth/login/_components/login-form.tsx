"use client"
import { ActionState } from "@/lib/auth/middleware"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { signIn } from "../actions"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function LoginForm({ mode = "signin" }: { mode?: "signin" }) {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const priceId = searchParams.get("priceId")
  const inviteId = searchParams.get("inviteId")
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signIn,
    { error: "" }
  )

  return (
    <form className="space-y-6" action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="userName">Username</Label>
        <div className="mt-1">
          <Input
            id="userName"
            name="userName"
            type="text"
            required
            maxLength={25}
            placeholder="Enter your userName"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            required
            minLength={6}
            maxLength={100}
            placeholder="Enter your password"
          />
        </div>
      </div>

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      <div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Loading...
            </>
          ) : mode === "signin" ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </Button>
      </div>
    </form>
  )
}
