import { useState, useEffect } from "react"
import { backendURL } from "../../../../components/Variables"
import CardDatos from "../Componentes/CardDatos"
import './Administrador.css'

export default function Dashboard () {
const [usuarios, setUsuarios] = useState(null)

  useEffect( () => {
    async function fetchDatos() {
      const response = await fetch(`${backendURL}/administrador`)
      if (!response.ok) {
        throw new Error('No se pudo obtener la información del administrador');
      }
      const data = await response.json()
      setUsuarios(data)
    }
    fetchDatos()
  },[])
  return (
    <div id='dashboard'>
      <div>
      <CardDatos name={'Total Usuarios'} number={usuarios} />asd
      </div>
    </div>
  )
}