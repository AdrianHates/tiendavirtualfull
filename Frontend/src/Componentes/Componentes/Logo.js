import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo () {
  return (
    <NavLink exact={'true'} to="/">
      <img src='' alt='LogoShop' />
    </NavLink>
  )
}

export default Logo;