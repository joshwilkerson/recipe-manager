import React from "react"
import Link from "next/link"

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Link href="/">Home</Link>
      <br></br>
      <Link href="/login">Login</Link>
    </div>
  )
}
export default Profile
