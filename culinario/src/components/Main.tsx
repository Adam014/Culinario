
import { User } from "firebase/auth";

interface MainProps {
  authUser: User | null; // Define the type for authUser
}

const main = ({ authUser } : MainProps) => {
  return (
    <main className="main">
        <div className="welcome-title">
        <h1>Welcome back {authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</h1>
        <h2>What are you cooking today?</h2>
        </div>
    </main>
  )
}

export default main
