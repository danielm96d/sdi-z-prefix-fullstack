import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

export default function UserPage(){
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))
  const [currentUserID, setCurrentUserID]= useState(localStorage.getItem('userID'))
  const [invList, setInvList] = useState([])
  const navigate = useNavigate();

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
      <h1>{currentUser}'s Inventory</h1>
      <DataTable value={invList}>
        <Column field='quantity' header='#' style={{width: '75px'}}></Column>
        <Column field='name' header='Item Name'></Column>
        <Column field='description' header='Item Description'></Column>
      </DataTable>
    </>
    
  )
}