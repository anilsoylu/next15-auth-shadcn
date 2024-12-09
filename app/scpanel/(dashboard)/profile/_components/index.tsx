"use client"

import { startTransition, useActionState, useState } from "react"
import { updateAccount } from "@/app/auth/login/actions"
import { useUser } from "@/lib/auth"
import { ActionState } from "@/lib/auth/middleware"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function ProfileForm() {
  const { user } = useUser()
  const [isActivated, setIsActivated] = useState<boolean>(
    user?.isActivated || false
  )
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    { error: "", success: "" }
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // If you call the Server Action directly, it will automatically
    // reset the form. We don't want that here, because we want to keep the
    // client-side values in the inputs. So instead, we use an event handler
    // which calls the action. You must wrap direct calls with startTranstion.
    // When you use the `action` prop it automatically handles that for you.
    // Another option here is to persist the values to local storage. I might
    // explore alternative options.

    const formData = new FormData(event.currentTarget)
    formData.set("isActivated", isActivated.toString())

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div className="mx-auto grid flex-1 auto-rows-max gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                defaultValue={user?.name || ""}
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                name="userName"
                placeholder="Enter your userName"
                defaultValue={user?.userName || ""}
                required
                autoComplete="off"
              />
            </div>
            <div className="grid gap-6">
              <Label htmlFor="isActivated">
                Enable or disable your account.
              </Label>
              <Switch
                id="isActivated"
                name="isActivated"
                disabled={isPending}
                checked={isActivated}
                onCheckedChange={() => setIsActivated(!isActivated)}
              />
            </div>
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
            {state.success && (
              <p className="text-green-500 text-sm">{state.success}</p>
            )}
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
