import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel";
import MenuBar from "./MenuBar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
export default function Login(){
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

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
              value={userName}
              onChange={(e) =>{
                if(e.target.value === ''){
                  setIsEmpty1(true)
                } else{setIsEmpty1(false)}
                setUserName(e.target.value)
              }
            }/>
            <label htmlFor='username'>Username</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              id='password'
              invalid={isEmpty1}
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
          <Button label='Login' onClick={()=>{
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
          }}/>
          <Button label='Register' onClick={()=>{
            navigate('/CreateAccount')
          }}/>
        </Card>
      </div>
    </>
    
  )
}