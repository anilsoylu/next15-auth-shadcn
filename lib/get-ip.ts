import { headers } from "next/headers"

export async function getClientIp(): Promise<string> {
  const headerValues = await headers()
  const forwarded = headerValues.get("x-forwarded-for")
  const ip =
    (forwarded && forwarded.split(",")[0]) || // Proxy arkasında IP adresi
    headerValues.get("x-real-ip") || // Proxy kullanmıyorsanız gerçek IP
    "unknown" // Eğer IP bulunamazsa varsayılan değer

  return ip === "::1" ? "127.0.0.1" : ip // IPv6 localhost'u IPv4 localhost'a dönüştür
}
