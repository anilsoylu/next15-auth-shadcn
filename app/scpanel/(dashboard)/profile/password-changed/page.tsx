import PasswordChangedForm from "./_components"

export async function generateMetadata() {
  return {
    title: "Şifre Değiştirme Sayfası",
  }
}

const PasswordChangedPage = () => {
  return <PasswordChangedForm />
}

export default PasswordChangedPage
