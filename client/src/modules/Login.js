import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Login(){
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  return(
    <>
      <h1>Login Page</h1>
      <button onClick={()=>{navigate('/inventory')}}>inventory</button>
      <label>
        username:
        <input onChange={(e)=>{
          setUserName(e.target.value);
          // console.log(userName)
        }} />
      </label>
      <label>
        password:
        <input onClick={(e)=>{
          setPassword(e.target.value);
          // console.log(userName)
        }}/>
      </label>
      <button onClick={()=>{
        fetch(`http://localhost:8080/users/${userName}`)
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
        })
      }}>Login</button>
    </>
    
  )
}