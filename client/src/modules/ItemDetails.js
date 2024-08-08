import { useEffect, useState, useTransition } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import {InputText} from 'primereact/inputtext'
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import '../css/ItemDetails.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import MenuBar from "./MenuBar";

export default function ItemDetails(){
  const location = useLocation()
  const {id} = location.state || {}
  const navigate = useNavigate();

  const [owner, setOwner] = useState(false)

  const [item, setItem] = useState(false)
  const [name, setName] = useState(false)
  const [quantity, setQuantity] = useState(false)
  const [description, setDescription] = useState(false)
  
  const [isEmpty1, setIsEmpty1] = useState(false)
  const [isEmpty2, setIsEmpty2] = useState(false)
  const [isEmpty3, setIsEmpty3] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(()=>{
    fetch(`http://localhost:8080/inventory/?id=${id}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data[0])
      setItem(data[0])
      setName(data[0].name)
      setQuantity(data[0].quantity)
      setDescription(data[0].description)
      return data[0].userID
    }).then(userID=>{
      fetch(`http://localhost:8080/users/?id=${userID}`)
      .then(res=>res.json())
      .then(data=>{
        console.log('owner being set to: ', ...data)
        setOwner(...data);
      })
    })
  },[])

  console.log(name)
  if(!item){
    console.log('item loading')
    return <ProgressSpinner />
  }
  // console.log('userID: ', parseInt(localStorage.getItem('userID')), 'testing agianst: ', item.userID)
  // This will test if the user is the one who owns the item or not, This will also
  // satsify the requirement that an unauthenticated user can see all item specifics without being able to
  // edit them.
  if(!localStorage.getItem('user')||parseInt(localStorage.getItem('userID'))!== item.userID){
    return(
      <div className="card">
        <MenuBar/>
        <Card title={name} subTitle={`quantity: ${quantity}`}>
          <h3>Description:</h3>
          <Divider/>
          {item.description}
        </Card>
      </div>
    )
  }
  return(
    <div className="main">
      <MenuBar/>
      <Card>
        <div className="ItemActions">
          <Button disabled={!isDisabled} icon='pi pi-pen-to-square' severity="success" onClick={()=>{
            setIsDisabled(false)
          }}/>
          <Button severity="danger" icon="pi pi-trash"onClick={()=>{
            const requestOptions = {
              method: "DELETE"
            };
            
            fetch(`http://localhost:8080/inventory/${id}`, requestOptions)
              .then((response) => response.text())
              .then((result) => {
                console.log(result)
                navigate('/user-details')
              })
              .catch((error) => console.error(error));
          }}/>
        </div>
        <FloatLabel>
          <InputText
            id='itemName'
            invalid={isEmpty1}
            disabled={isDisabled}
            value={name}
            onChange={(e) =>{
              if(e.target.value === ''){
                setIsEmpty1(true)
              } else{setIsEmpty1(false)}
              setName(e.target.value)
            }
          }/>
          <label htmlFor='itemName'>Item Name</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id='quantity'
            invalid={isEmpty2}
            keyfilter='int'
            disabled={isDisabled}
            value={quantity}
            onChange={(e) =>{
              if(e.target.value === ''){
                setIsEmpty2(true);
              }else{setIsEmpty2(false)}
              setQuantity(e.target.value)
            }
          }/>
          <label htmlFor='quantity'>Item Quantity</label>
        </FloatLabel>
        <FloatLabel>
          <InputTextarea
            id='itemDesc'
            disabled={isDisabled}
            autoResize
            invalid={isEmpty3}
            value={description}
            style={{height: 'fit-content'}}
            onChange={(e) =>{
              if(e.target.value === ''){
                setIsEmpty3(true);
              }else{setIsEmpty3(false)}
              setDescription(e.target.value)
            }
          }/>
          <label htmlFor='itemDesc'>Item Description</label>
        </FloatLabel>
        <Button disabled={isDisabled} label="Submit" icon="pi pi-check" iconPos="right" onClick={()=>{
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          const raw = JSON.stringify({
            userID: localStorage.getItem('userID'),
            name: name,
            description: description,
            quantity: quantity
          });
          
          const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };
          
          fetch(`http://localhost:8080/inventory/${item.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result)
              setIsDisabled(true);
            })
            .catch((error) => console.error(error));
        }}/>
      </Card>
    </div>
  )
}