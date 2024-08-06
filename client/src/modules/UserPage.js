import { useState } from "react"

export default function UserPage(){
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))

  if(!currentUser)
    return(<h1>You Must be logged in to access this page</h1>)
  return(
    <>
      <h1>userPage</h1>
      <label>
        username:
        <input />
      </label>
      <label>
        password:
        <input />
      </label>
    </>
    
  )
}