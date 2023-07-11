import React from 'react'
import { NavLink } from 'react-router-dom'
import { opciones } from '../Pages/Category'
import { BsFacebook, BsLinkedin } from 'react-icons/bs'
import { FaInstagramSquare, FaTiktok, FaYoutubeSquare } from 'react-icons/fa'
import ModalMarcas from './ModalMarcas'



function Informacion( { tienda } ) {
  return(
    <>
    <div id='informacion'>
      <div>
        <h5>{tienda}</h5>
        <ul>
          <li>
            Trabaja con Nosotros
          </li>
          <li>
            <NavLink to='/informacion/nosotros'>
            Nosotros
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <h5>Marcas</h5>
        <ModalMarcas />
      </div>
      <div>
        <h5>Atención al usuario</h5>
        <ul>
          <li>Preguntas frecuentes</li>
          <li>Términos y condiciones</li>
          <li>Cambios y devoluciones</li>
          <li>Política y protección de datos</li>
        </ul>
      </div>
      <div>
        <h5>Síguenos en</h5>
        <div>
          <BsFacebook />
          <FaInstagramSquare />
          <FaTiktok />
          <FaYoutubeSquare />
          <BsLinkedin />
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Informacion