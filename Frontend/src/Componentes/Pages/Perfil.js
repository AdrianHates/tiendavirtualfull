import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { backendURL } from '../Componentes/Variables';
import { useNavigate } from 'react-router-dom';

function Perfil () {
  const { user, setUser } = useContext(AppContext);
  console.log(user)
  const navigate = useNavigate()
  async function cerrarSesion () {
    const response = await fetch(`${backendURL}/api/user/logout`, {
      method: 'GET',
    })    
    if(response.ok) {
      setUser(null)
      navigate("/")
      
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