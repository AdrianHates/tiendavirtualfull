import React, { useContext } from 'react'
import { AppContext } from '../../App'
import '../../styles/Perfil.css'
function Perfil () {
  const { user, setUser } = useContext(AppContext);

  return(
    <div className='perfil'>
      {user&&<>
      <h3>Mi Perfil</h3>
      <div>
        <div><label>Nombre:</label></div>
        <div><label>Apellido:</label></div>
        <div><label>Email:</label>{user.email}</div>
        <div><label>Documento de identidad:</label></div>
        <div><label>Telefono:</label></div>
        <button>Modificar Datos</button>  
      </div>
      </>}
    </div>
  )
}

export default Perfil