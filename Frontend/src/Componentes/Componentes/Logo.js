import React from 'react';
import { NavLink } from 'react-router-dom';
import { marcaLogo } from '../../svg/iconos';
function Logo () {
  return (
    <NavLink exact={'true'} to='/'>
    
      {marcaLogo}
    
    </NavLink>
  )
}

export default Logo;