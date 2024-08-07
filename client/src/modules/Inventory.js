import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Column } from 'primereact/column';
import MenuBar from "./MenuBar";
import { DataTable } from 'primereact/datatable';

export default function Inventory(){
  const [invList, setInvList] = useState([])
  const navigate = useNavigate();
  const descriptionOverflowStyle = {
    maxWidth: "26.5ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }

  useEffect(()=>{
    fetch(`http://localhost:8080/inventory`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setInvList(data)
    })
  },[])

  if(invList.length === 0)
    return <>LOADING...</>
  return(
    <>
      <MenuBar/>
      <DataTable value={invList} style={{marginTop: '100px'}} selectionMode='single' onRowSelect={(event)=>{
        // console.log('e.target: ', event.data)
        navigate('/item-details', {state: event.data})
      }}>
        <Column field='quantity' header='#' style={{width: '75px'}}></Column>
        <Column field='name' header='Item Name'></Column>
        <Column field='description' header='Item Description' style={descriptionOverflowStyle}></Column>
        <Column field='delete'></Column>
      </DataTable>
    </>
    
  )
}