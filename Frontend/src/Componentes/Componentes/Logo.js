import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo ({tienda}) {
  return (
    <NavLink exact={'true'} to='/'>
    
      <img src='' alt={tienda} />
    
    </NavLink>
  )
}

export default Logo;