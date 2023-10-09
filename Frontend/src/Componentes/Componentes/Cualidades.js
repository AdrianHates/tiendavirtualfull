import React from "react";
import { NavLink } from "react-router-dom";

const cualidades = [
  {
    urlImg: 'https://topitop.vteximg.com.br/arquivos/220816_beneficios__03.png?v=637962590492900000',
    url: ''
  }
]

export default function Cualidades () {
  return(
  <div id='cualidades'>
    {
      cualidades.map( (elemento,i) => 
        <NavLink key={i} to={elemento.url}>
          <img src={elemento.urlImg} />
        </NavLink>)
    }
  </div>
  )
}