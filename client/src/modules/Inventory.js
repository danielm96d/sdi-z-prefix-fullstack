import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Inventory(){
  const [invList, setInvList] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    fetch(`http://localhost:8080/inventory`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setInvList(data)
    })
  },[])

  if(invList.length === 0)
    return <>LOADING...</>
  return(
    <>
      <h1>Inventory Page</h1>
      <button onClick={()=>{
        if(localStorage.getItem('user'))navigate("/user-details")
        else navigate("/Login")
      }}>LOGIN</button>
      <button onClick={()=>{navigate("/user-details")}}>Usser Details</button>
      {
        invList.map((item)=>{
          return(
            <>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </>
          )
        })
      }
    </>
    
  )
}