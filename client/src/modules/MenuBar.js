import { Menubar } from "primereact/menubar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuBar(){
  const [loginVisible] = useState(localStorage.getItem('user') ? false : true)
  const navigate = useNavigate()
  const pages = !loginVisible ? [
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
  ]:[
    {
      label: 'Master Inventory',
      icon: 'pi pi-home',
      url: '/inventory'
    },
    {
      icon: 'pi pi-ellipsis-h',
      items: [
        {
          label: 'Login',
          command: ()=>{
            navigate('/Login');
          }
        }
      ] 
    }
  ]
  return <Menubar model={pages} style={{position:'absolute'}}/>
}