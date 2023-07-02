import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../App';
import { HiUserCircle } from 'react-icons/hi';
import { AiFillShopping } from 'react-icons/ai'
import { tienda } from './Variables';
import Logo from './Logo'

export default function Navegador() {

  const [mostrar, setMostrar] = useState(false);
  const { setOpcionSeleccionada, setShowModal, user } = useContext(AppContext)

  function resetAll (){
    setOpcionSeleccionada([]);
    if(document.querySelectorAll('input[type="checkbox"]')) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    }
  }

  function metodoMostrar() {
    if(mostrar) {
      setMostrar(false)
    } else {
      setMostrar(true)
    }
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const sumarCantidades = (user) => {
    return user && user.carts && user.carts.items ? user.carts.items.reduce((total, item) => total + (item.quantity), 0) : 0;
  };

  return (
    <nav id='nav'>
          <ul>
            <li>
              <Logo tienda={tienda} />
            </li>
            <li>
              <ul>
                <li>
                <NavLink to="/productos/mujer" className={({isActive})=>{
                  return isActive ? 'is-active' : undefined
                }} onClick={resetAll}>
                  Mujer
                </NavLink>
                </li>
                <li>
                <NavLink to="/productos/hombre" className={({isActive})=>{
                  return isActive ? 'is-active' : undefined
                }} onClick={resetAll}>
                  Hombre
                </NavLink>
                </li>
                <li>
                <NavLink to="/productos/niños" className={({isActive})=>{
                  return isActive ? 'is-active' : undefined
                }} onClick={resetAll}>
                  Niños
                </NavLink>
                </li>
                <li>
                <NavLink to="/productos/marcas" className={({isActive})=>{
                  return isActive ? 'is-active' : undefined
                }} onClick={resetAll}>
                  Marcas
                </NavLink>
                </li>
              </ul>
            </li>            
            <ul>              
              {user ? 
                <NavLink to='/api/user/perfil'>
                  <div>                  
                  <HiUserCircle className='iconMiCuenta' />
                  <div>Mi perfil</div>
                  </div>
                </NavLink> :
              <li id='miCuenta' onClick={metodoMostrar}>
                <div>                  
                  <HiUserCircle className='iconMiCuenta' />
                  <div>Mi cuenta</div>
                </div>
                {mostrar &&
                (<div id='ingresar'>                  
                  <button onClick={handleShowModal}>Login</button>     
                  <NavLink to='/api/users/register'>
                    Register
                  </NavLink>
                </div>)}
              </li>}
              <li>
                <NavLink to="/carrito">
                <div style={{position:'relative', display: 'flex', flexDirection:'column',alignItems:'center'}}>                  
                  <AiFillShopping className='iconMiCuenta' />
                  {/*corregir position, translate */}
                  <div style={{position: 'absolute', top: '0.4rem', left:'0', color:'black', width:'100%', fontWeight: '500', fontSize:'1rem', textAlign: 'center'}}>{sumarCantidades(user)}</div>
                  <div>Carrito</div>
                </div>
                </NavLink>
              </li>             
            </ul>
          </ul>
        </nav>
  )
}