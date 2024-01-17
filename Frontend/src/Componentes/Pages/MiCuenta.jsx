import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import Perfil from "./Perfil"
import Pedidos from "../Componentes/Pedidos";
import { backendURL } from "../Componentes/Variables";
import { AppContext } from "../../App";
import { AiOutlineLogout } from 'react-icons/ai'

function MiCuenta() {
  const { setUser } = useContext(AppContext)
  const [opcionMiCuenta, setOpcionMiCuenta] = useState('Mi Perfil')
  const navigate = useNavigate()

  async function cerrarSesion () {
    
    const response = await fetch(`${backendURL}/api/user/logout`)
  
    if(response.ok) {      
      setUser(null)
      navigate("/")
    } else {
      console.log('algo pas[o] D:')
    }
  }

  const miCuentaOpciones = {
    'Mi Perfil': <Perfil />,
    'Mis Pedidos': <Pedidos />
  }
  
  function renderizarOpcion (str) {
    setOpcionMiCuenta(str)
  }

  return(
    <div id='mi-cuenta-page'>
      <ul>
      {Object.keys(miCuentaOpciones).map((x,i)=>{
      return <li key={i}><button className={`${x===opcionMiCuenta?'opcion-pedido-seleccionado':''}`} onClick={()=>{
        renderizarOpcion(x)
      }}>{x}</button>
      </li>})}
      <li><button onClick={cerrarSesion}><AiOutlineLogout /></button></li>
      </ul>
      {miCuentaOpciones[opcionMiCuenta]}      
    </div>
  
  )
}

export default MiCuenta