import { hashSync } from "bcryptjs"

const userName = process.env.NEXT_PUBLIC_ADMIN_USERNAME!
const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!

console.log("ADMIN_USERNAME:", userName)
console.log("ADMIN_PASSWORD:", password)

const users = [
  {
    userName: userName!,
    password: hashSync(password, 10),
    isSuperUser: true,
  },
]

export { users }
