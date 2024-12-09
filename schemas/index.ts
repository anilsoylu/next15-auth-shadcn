import * as z from "zod"

export const LoginSchema = z.object({
  userName: z.string().min(1, {
    message: "Kullanıcı adı gereklidir",
  }),
  password: z.string().min(1, {
    message: "Şifre gereklidir",
  }),
})
