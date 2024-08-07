import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount(){
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate();
  return(
    <>
      <label>
        ENTER USERNAME: 
        <input onChange={(e)=>{
          setUserName(e.target.value);
          // console.log(userName)
        }}/>
      </label>
      <label>
        ENTER PASSWORD: 
        <input onChange={(e)=>{
          setPassword(e.target.value);
          // console.log(userName)
        }}/>
      </label>
      <label>
        ENTER FIRST NAME: 
        <input onChange={(e)=>{
          setFirstName(e.target.value);
          // console.log(userName)
        }}/>
      </label>
      <label>
        ENTER LASTNAME: 
        <input onChange={(e)=>{
          setLastName(e.target.value);
          // console.log(userName)
        }}/>
      </label>
      <button onClick={()=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const postData = JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          password: password
        })
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: postData,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/users", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .then((data)=>{navigate('/Login')})
          .catch((error) => console.error(error));
      }}>SUBMIT</button>
    </>
  )
}