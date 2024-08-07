import { useLocation } from "react-router-dom"

export default function ItemDetails(){
  const location = useLocation()
  const {id} = location.state || {}
  console.log(id)
  return(
    <>
      <h1>{id}</h1>
    </>
    
  )
}