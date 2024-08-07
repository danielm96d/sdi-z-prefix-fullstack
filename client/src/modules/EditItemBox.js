import {InputText} from 'primereact/inputtext'
import { FloatLabel } from "primereact/floatlabel";
import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useLocation } from 'react-router-dom';
import '../css/EditItemBox.css'
import 'primeicons/primeicons.css';
        
export default function EditItemBox({prop}){
  const item = prop.itemData
  console.log(item)
  const [value, setValue] = useState('');
  const [name, setName] = useState(item.name)
  const [quantity, setQuantity] = useState(item.quantity)
  const [description, setDescription] = useState(item.description)
  const [isEmpty, setIsEmpty] = useState(false)
  return(
    <>
      <FloatLabel>
        <InputText
          id='itemName'
          invalid={isEmpty}
          value={name}
          onChange={(e) =>{
            if(e.target.value === ''){
              setIsEmpty(true);
            }
            setName(e.target.value)
          }
        }/>
        <label htmlFor='itemName'>Item Name</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id='quantity'
          invalid={isEmpty}
          value={quantity}
          onChange={(e) =>{
            if(e.target.value === ''){
              setIsEmpty(true);
            }
            setQuantity(e.target.value)
          }
        }/>
        <label htmlFor='quantity'>Item Quantity</label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea
          id='itemDesc'
          invalid={isEmpty}
          value={description}
          onChange={(e) =>{
            if(e.target.value === ''){
              setIsEmpty(true);
            }
            setDescription(e.target.value)
          }
        }/>
        <label htmlFor='itemDesc'>Item Description</label>
      </FloatLabel>
      <Button label="Submit" icon="pi pi-check" iconPos="right" onClick={()=>{
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
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      }}/>
    </>
  )
}