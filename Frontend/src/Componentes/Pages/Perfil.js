import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { backendURL } from '../Componentes/Variables';
import { Navigate } from 'react-router-dom';

function Perfil () {
  const { user, setUser } = useContext(AppContext);
  console.log(user)

  async function cerrarSesion () {
    const response = await fetch(`${backendURL}/api/user/logout`, {
      method: 'GET',
    })    
    if(response.ok) {
      console.log('logout exitoso')
      return <Navigate to='/' replace={true} />
    } else {
      console.log('algo pas[o] D:')
    }
  }

  return(
    <div className='perfil'>
      {user&&<>
      <h3>Mi Perfil</h3>
      <div>
        <div><label>Nombre:</label></div>
        <div><label>Apellido:</label></div>
        <div><label>Email:</label>{user.email}</div>
        <div><label>Documento de identidad</label></div>
        <div><label>Telefono</label></div>
        <button>Modificar Datos</button>
        <button onClick={cerrarSesion}>Cerrar Session</button>
      </div>
      </>}
    </div>
  )
}

export default Perfil