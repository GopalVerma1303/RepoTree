import { useSession } from "next-auth/react"
import axios from "axios"
import { useState } from "react"

export default function Home() {
  const { data: session, status } = useSession()
  const [userName, setUserName] = useState()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (!session) {
    return <a href="/api/auth/signin">Sign in with GitHub</a>
  }

  const { user } = session
  console.log(session);

  const handleGenerate = () => {
    axios
      .get(`https://api.github.com/users/${userName}/repos`,
      {
        headers: {
          authorization: `token ${session.accessToken}`
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return (
    <>
      <h1>Repositories for {user.name}</h1>
      <p>This page will display the user's repositories.</p>
      <input type="name" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <button onClick={handleGenerate}>Generate</button>
    </>
  )
}
