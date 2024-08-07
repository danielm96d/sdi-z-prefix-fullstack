import { useEffect, useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import {InputText} from 'primereact/inputtext'
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import '../css/ItemDetails.css'
import { Menubar } from 'primereact/menubar';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function ItemDetails(){
  const location = useLocation()
  const {id} = location.state || {}
  const navigate = useNavigate();

  const [item, setItem] = useState(false)
  const [name, setName] = useState(false)
  const [quantity, setQuantity] = useState(false)
  const [description, setDescription] = useState(false)
  
  const [isEmpty1, setIsEmpty1] = useState(false)
  const [isEmpty2, setIsEmpty2] = useState(false)
  const [isEmpty3, setIsEmpty3] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const pages=[
    {
      label: 'Master Inventory',
      icon: 'pi pi-home',
      url: '/inventory'
    },
    {
      label: `${localStorage.getItem('user')}'s Inventory`,
      icon: 'pi pi-user',
      url: '/user-details'
    },
    {
      icon: 'pi pi-ellipsis-h',
      items: [
        {
          label: 'Logout',
          command: ()=>{
            localStorage.setItem('user','');
            localStorage.setItem('userID','');
            navigate('/inventory');
          }
        }
      ]
    }
  ]

  useEffect(()=>{
    fetch(`http://localhost:8080/inventory/?id=${id}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data[0])
      setItem(data[0])
      setName(data[0].name)
      setQuantity(data[0].quantity)
      setDescription(data[0].description)
    })
  },[])

  console.log(name)
  if(!item){
    console.log('item loading')
    return <ProgressSpinner />
  }
  return(
    <div className="main">
      <Menubar model={pages}/>
      <Button disabled={!isDisabled} icon='pi pi-pen-to-square' severity="success" onClick={()=>{
        setIsDisabled(false)
      }}/>
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
          invalid={isEmpty3}
          value={description}
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
    </div>
  )
}