import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { NavLink, Routes, Route, useLocation, json } from 'react-router-dom';
//pages
import HomePage from './Componentes/Pages/HomePage';
import RegisterPage from './Componentes/Pages/RegisterPage';
import Carrito from './Componentes/Pages/Carrito';
import Category from './Componentes/Pages/Category'
import ProductDetails from './Componentes/Pages/ProductDetails';
import Nosotros from './Componentes/Pages/Nosotros';
import Perfil from './Componentes/Pages/Perfil'
import Devoluciones from './Componentes/Pages/Devoluciones';
//componentes
import Login from './Componentes/Componentes/Login'
import Contacto from './Componentes/Componentes/Contacto';
import Logo from './Componentes/Componentes/Logo';
import Informacion from './Componentes/Componentes/Informacion';
//icons
import { HiUserCircle, HiOutlineShoppingBag } from 'react-icons/hi';

//datos
import { tienda, backendURL } from './Componentes/Componentes/Variables'
export const AppContext = createContext(); 


function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  const location = useLocation();
  const isCarritoPage = location.pathname === '/carrito'
  
  const resetAll = () => {
    setOpcionSeleccionada([]);
    if(document.querySelectorAll('input[type="checkbox"]')) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    }
  }
  
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const metodoMostrar = () => {
    if(mostrar) {
      setMostrar(false)
    } else {
      setMostrar(true)
    }
  }

  useEffect(() => {
      fetch(`${backendURL}/api/get/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
    
      fetch(`${backendURL}/api/user/usuarioLog`)
      .then(res => {
        if (!res.ok) {
          throw new Error('');
        }
        return res.json();
      })
      .then(data => setUser(data))
      .catch(error => console.error(error));

  }, []);

  const sumarCantidades = (user) => {
    return user && user.carts && user.carts.items ? user.carts.items.reduce((total, item) => total + (item.quantity || 0), 0) : 0;
  };

  useEffect(() => {
    const totalCantidades = sumarCantidades(user);
    setCantidadCarrito(totalCantidades);
  }, [user]);
  

  return(
    <AppContext.Provider  value={{ user, setUser, products, setProducts, setShowModal, opcionSeleccionada, setOpcionSeleccionada }}>    
      {isCarritoPage?null:(
        <nav id='nav'>
          <ul>
            <li>
              <Logo tienda={tienda} />
            </li>
            <li>
              <ul style={{display: 'Flex', gap: '1rem', listStyleType: 'none'}}>
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
            <ul style={{display: 'flex', alignItems: 'center', gap: '1rem', listStyleType: 'none'}}>              
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
                  <HiOutlineShoppingBag className='iconMiCuenta' />
                  {/*corregir position, translate */}
                  <div style={{position: 'absolute', top: '0.5rem', left:'0', color:'red', width:'100%', fontWeight: '500', textAlign: 'center'}}>{cantidadCarrito}</div>
                  <div>Carrito</div>
                </div>
                </NavLink>
              </li>             
            </ul>
          </ul>
        </nav>)}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos/hombre" element={<Category category='Hombre' />} />
          <Route path="/productos/mujer" element={<Category category='Mujer' />} />
          <Route path="/productos/niños" element={<Category category='Niños' />} />
          <Route path="/api/users/register" element={<RegisterPage />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/api/user/perfil" element={<Perfil />} />
          <Route path="/productos/:id" element={<ProductDetails />} />
          <Route path="/informacion/nosotros" element={<Nosotros tienda={tienda} />} />
          <Route path="/cambios-y-devoluciones" element={<Devoluciones />} />
        </Routes>
        {showModal && (
                  <div className="modelo">
                    <div className="modelo-content">
                      <span className="close" onClick={handleCloseModal}>
                        Cerrar &times;
                      </span>
                      <Login backendURL={backendURL}/>
                    </div>
                  </div>
        )}
        
        <Informacion tienda={tienda} />
        <div className='divHr'>
        <hr className='hr'/>
        </div>
        <Contacto />           
        <footer>
          Example 2023 © Todos los derechos reservados
        </footer>    
  </AppContext.Provider> 
  );
}

export default App;
