import ProfileForm from "./_components"

export async function generateMetadata() {
  return {
    title: "Profil Sayfası",
  }
}

const DashboardProfilePage = () => {
  return <ProfileForm />
}

export default DashboardProfilePage
