import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Login(){
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  return(
    <>
      <h1>Login Page</h1>
      <button onClick={()=>{
        localStorage.setItem('user','');
        localStorage.setItem('userID','');
        navigate('/inventory')
      }}>Logout</button>
      <button onClick={()=>{navigate('/inventory')}}>inventory</button>
      <label>
        username:
        <input onChange={(e)=>{
          setUserName(e.target.value);
          // console.log(userName)
        }}/>
      </label>
      <label>
        password:
        <input onChange={(e)=>{
          setPassword(e.target.value);
          // console.log(userName)
        }}/>
      </label>
      <button onClick={()=>{
        if(!userName || !password){
          console.log('empty fields are invalid')
          return 
        }
        try {
          fetch(`http://localhost:8080/users/?username=${userName}`)
          .then(res=>res.json())
          .then(data=>{
            let userData = data[0];
            if(password=== userData.password){
              console.log(`Successful login as ${userName}`);
              localStorage.setItem('user',userName);
              localStorage.setItem('userID',userData.id);
              navigate('/user-details')
            }
            else{
              console.log('error incorrect password')
            }
          })
        } catch (error) {
          console.log('invalid username')
        }
      }}>Login</button>
      <button onClick={()=>{
        navigate('/CreateAccount')
      }}>Register</button>
    </>
    
  )
}