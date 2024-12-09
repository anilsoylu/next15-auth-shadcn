import Loading from "@/components/Loading"
import { Suspense } from "react"
import { CardWrapper } from "../_components/card-wrapper"
import LoginForm from "./_components/login-form"

export async function generateMetadata() {
  return {
    title: "Giriş Yap",
    description: "Giriş yaparak uygulamaya erişebilirsiniz.",
  }
}

const AuthLoginPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CardWrapper
        headerLabel="Tekrar hoş geldin!"
        backButtonLabel="Hesabınız yok mu? Kayıt olun."
      >
        <LoginForm mode="signin" />
      </CardWrapper>
    </Suspense>
  )
}

export default AuthLoginPage
