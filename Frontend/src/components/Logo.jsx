import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { marcaLogo } from '../svg/iconos';
import { AppContext } from '../App';

function Logo () {
  const { viewNavigate, setEstadoMarcas } = useContext(AppContext)
  return (
    <NavLink exact={'true'} to='/' className={({isActive})=>{
      return isActive ? 'is-active' : undefined
    }} onClick={(event)=>{viewNavigate(event, '/'); setEstadoMarcas(false)}}>
    
      {marcaLogo}
    
    </NavLink>
  )
}

export default Logo;