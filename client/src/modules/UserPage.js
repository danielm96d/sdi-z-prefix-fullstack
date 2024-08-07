import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext'
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from 'primereact/inputtextarea';

export default function UserPage(){
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))
  const [currentUserID, setCurrentUserID]= useState(localStorage.getItem('userID'))
  const [isVisible, setIsVisible] =useState(false)
  const [invList, setInvList] = useState([])

  const [isEmpty1, setIsEmpty1] = useState(true)
  const [isEmpty2, setIsEmpty2] = useState(true)
  const [isEmpty3, setIsEmpty3] = useState(true)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate();
  const descriptionOverflowStyle = {
    maxWidth: "26.5ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
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
    fetch(`http://localhost:8080/inventory/?userID=${currentUserID}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setInvList(data)
    })
  },[])

  if(!currentUser)
    return(<h1>You Must be logged in to access this page</h1>)
  return(
    <>
      <Menubar model={pages}/>
      <DataTable value={invList} selectionMode='single' onRowSelect={(event)=>{
        // console.log('e.target: ', event.data)
        navigate('/item-details', {state: event.data})
      }}>
        <Column field='quantity' header='#' style={{width: '75px'}}></Column>
        <Column field='name' header='Item Name'></Column>
        <Column field='description' header='Item Description' style={descriptionOverflowStyle}></Column>
        <Column field='delete'></Column>
      </DataTable>
      
      <Button icon='pi pi-plus' onClick={()=>{setIsVisible(true)}}/>
      <Dialog header='ADD ITEM' visible={isVisible} onHide={() => {if (!isVisible) return; setIsVisible(false); }}>
      <FloatLabel>
        <InputText
          id='itemName'
          invalid={isEmpty1}
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
      <Button icon='pi pi-check' onClick={()=>{
        if(isEmpty1||isEmpty2||isEmpty3){
          return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          userID: localStorage.getItem('userID'),
          name: name,
          description: description,
          quantity: quantity
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch(`http://localhost:8080/inventory`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(...result);
            setInvList([...invList, ...result])
            setIsVisible(false);
          })
          .catch((error) => console.error(error));
      }}/>
      </Dialog>
    </>
    
  )
}