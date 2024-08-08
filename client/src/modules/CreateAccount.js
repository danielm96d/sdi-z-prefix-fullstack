import MenuBar from "./MenuBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";

export default function CreateAccount(){
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [usernameList, setUsernameList] = useState([])
  const navigate = useNavigate();

  const [isEmpty1, setIsEmpty1] = useState(true)
  const [isEmpty2, setIsEmpty2] = useState(true)
  const [isEmpty3, setIsEmpty3] = useState(true)
  const [isEmpty4, setIsEmpty4] = useState(true)
  const [isEmpty5, setIsEmpty5] = useState(true)
  const [disabled, setDisabled] = useState(true)

  useEffect(()=>{
    fetch(`http://localhost:8080/users`)
    .then(res=>res.json())
    .then(data=>{
      let userNameArray = []
      // console.log(data)
      for(let item of data){
        userNameArray.push(item.userName)
      }
      console.log(userNameArray)
      setUsernameList(userNameArray)
    })
    .catch(err=>{
      console.log('error msg: ', err)
    })
  },[])

  useEffect(()=>{
    // console.log('working')
    if(password !== password2 || !password || !password2){
      setIsEmpty5(true)
      setIsEmpty4(true)
    } else{
      setIsEmpty5(false)
      setIsEmpty4(false)
    }
  },[password2])
  
  useEffect(()=>{
    // console.log('working')
    if(isEmpty1 || isEmpty2 || isEmpty3 || isEmpty4 || isEmpty5 || password !== password2) setDisabled(true)
    else setDisabled(false)
  },[password, password2, userName, firstName, lastName])
  return(
    <>
      <MenuBar/>
      <div className="content">
        <Card title='Enter New User Information'>
          <form>
            <FloatLabel>
              <InputText
                id='firstName'
                invalid={isEmpty1}
                style={{width: '100%'}}
                value={firstName}
                onChange={(e) =>{
                  if(e.target.value === ''){
                    setIsEmpty1(true)
                  } else{setIsEmpty1(false)}
                  setFirstName(e.target.value)
                }
              }/>
              <label htmlFor='firstName'>Please Enter First Name:</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id='lastName'
                invalid={isEmpty2}
                style={{width: '100%'}}
                value={lastName}
                onChange={(e) =>{
                  if(e.target.value === ''){
                    setIsEmpty2(true)
                  } else{setIsEmpty2(false)}
                  setLastName(e.target.value)
                }
              }/>
              <label htmlFor='lastName'>Please Enter Last Name:</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id='username'
                invalid={isEmpty3}
                style={{width: '100%'}}
                value={userName}
                onChange={(e) =>{
                  if(e.target.value === ''){
                    setIsEmpty3(true)
                  } else{setIsEmpty3(false)}
                  setUserName(e.target.value)
                }
              }/>
              <label htmlFor='username'>Please Enter a Username:</label>
            </FloatLabel>
            <FloatLabel>
              <Password
                id='password'
                invalid={isEmpty4}
                style={{width: '100%'}}
                value={password}
                feedback={true}
                toggleMask
                onChange={(e) =>{
                  if(e.target.value === ''){
                    setIsEmpty4(true)
                  } else{setIsEmpty4(false)}
                  setPassword(e.target.value)
                }
              }/>
              <label htmlFor='password'>Please Enter a Password:</label>
            </FloatLabel>
            <FloatLabel>
              <Password
                id='password2'
                invalid={isEmpty5}
                style={{width: '100%'}}
                value={password2}
                feedback={false}
                toggleMask
                onChange={(e) =>{
                  setPassword2(e.target.value)
                  if(e.target.value === ''){
                    setIsEmpty5(true)
                  } else{setIsEmpty5(false)}
                }
              }/>
              <label htmlFor='password2'>Please Re-Enter a Password:</label>
            </FloatLabel>
          </form>
          <Divider/>
          <div className="regBtns">
            <Button label='Login' disabled={disabled} onClick={()=>{
              if(usernameList.indexOf(userName) !== -1){
                setIsEmpty3(true)
                return
              }
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
            }}/>
          </div>
        </Card>
      </div>
    </>
  )
}