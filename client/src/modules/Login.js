import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel";
import MenuBar from "./MenuBar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { useAuth0 } from "@auth0/auth0-react";
export default function Login(){
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {loginWithRedirect } = useAuth0();
  const [isEmpty1, setIsEmpty1] = useState(false)
  const [isEmpty2, setIsEmpty2] = useState(false)

  return(
    <>
      <MenuBar/>
      <div className="content">
        <Card title='Enter User Information'>
          <FloatLabel>
            <InputText
              id='username'
              invalid={isEmpty1}
              style={{width: '100%'}}
              value={username}
              onChange={(e) =>{
                if(e.target.value === ''){
                  setIsEmpty1(true)
                } else{setIsEmpty1(false)}
                setUsername(e.target.value)
              }
            }/>
            <label htmlFor='username'>Username</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              id='password'
              invalid={isEmpty2}
              style={{width: '100%'}}
              value={password}
              feedback={false}
              toggleMask
              onChange={(e) =>{
                if(e.target.value === ''){
                  setIsEmpty2(true)
                } else{setIsEmpty2(false)}
                setPassword(e.target.value)
              }
            }/>
            <label htmlFor='password'>Password</label>
          </FloatLabel>
          <Divider/>
          <div className="regBtns">
            <Button label='Login' onClick={()=>{
              if(!username || !password){
                console.log('empty fields are invalid')
                return 
              }

              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              const raw = JSON.stringify({ username: username, password: password})

              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
              };

              try {
                fetch(`http://localhost:8080/login`,requestOptions)
                .then(res=>res.json())
                .then(data=>{
                  console.log('LOGIN.JS data: ',data)
                  let response = data;
                  if(response.message === 'Login successful'){
                    console.log(`Successful login as ${username}`);
                    localStorage.setItem('user',username);
                    localStorage.setItem('userID',response.id);
                    navigate('/user-details')
                  }
                  else{
                    console.log('error incorrect password')
                  }
                })
                .catch(err=>{
                  console.error(err)
                })
              } catch (error) {
                console.log('invalid username')
              }
            }}/>
            <Button label='Register' onClick={()=>{
              navigate('/CreateAccount')
            }}/>
          </div>
        </Card>
      </div>
    </>
    
  )
}