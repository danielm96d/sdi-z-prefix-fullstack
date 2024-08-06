import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function UserPage(){
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))
  const [currentUserID, setCurrentUserID]= useState(localStorage.getItem('userID'))
  const [invList, setInvList] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    fetch(`http://localhost:8080/inventory/${currentUserID}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setInvList(data)
    })
  },[])

  if(!currentUser)
    return(<h1>You Must be logged in to access this page</h1>)
  return(
    <>
      <button onClick={()=>{navigate("/inventory")}}>inventory</button>
      <h1>{currentUser}'s Inventory</h1>
      {
        invList.map(item=>{
          return <li key={item.id}>{item.name}</li>
        })
      }
    </>
    
  )
}