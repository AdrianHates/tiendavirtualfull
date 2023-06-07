import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './Componentes/Pages/HomePage';
import RegisterPage from './Componentes/Pages/RegisterPage';
import Carrito from './Componentes/Pages/Carrito';
import Login from './Componentes/Componentes/Login'
import Perfil from './Componentes/Pages/Perfil'
import Category from './Componentes/Pages/Category'
import ProductDetails from './Componentes/Pages/ProductDetails';
import Logo from './Componentes/Componentes/Logo';
import { HiUserCircle, HiOutlineShoppingBag } from 'react-icons/hi';
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
  console.log(products)
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
    fetch('/api/get/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
    
      fetch('/api/user/usuarioLog')
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
              <Logo />
            </li>
            <li>
              <ul style={{display: 'Flex', gap: '1rem', listStyleType: 'none'}}>
                <li>
                <NavLink to="/productos/mujer" onClick={resetAll}>
                  Mujer
                </NavLink>
                </li>
                <li>
                <NavLink to="/productos/hombre" onClick={resetAll}>
                  Hombre
                </NavLink>
                </li>
                <li>
                <NavLink to="/productos/niños" onClick={resetAll}>
                  Niños
                </NavLink>
                </li>
                <li>
                <NavLink to="/productos/marcas" onClick={resetAll}>
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
                  <div>Mi cuenta</div>
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
                  <div style={{position: 'absolute', top: '7.5px', left:'20px', color:'red'}}>{cantidadCarrito}</div>
                  <div>Carrito</div>
                </div>
                </NavLink>
              </li>             
            </ul>
          </ul>
        </nav>)}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/productos/hombre" element={<Category category='Hombre' />} />
          <Route exact path="/productos/mujer" element={<Category category='Mujer' />} />
          <Route exact path="/productos/niños" element={<Category category='Niños' />} />
          <Route exact path="/api/users/register" element={<RegisterPage />} />
          <Route exact path="/carrito" element={<Carrito />} />
          <Route exact path="/api/user/perfil" element={<Perfil />} />
          <Route exact path="/productos/:id" element={<ProductDetails />} />
        </Routes>
        {showModal && (
                  <div className="modelo">
                    <div className="modelo-content">
                      <span className="close" onClick={handleCloseModal}>
                        Cerrar &times;
                      </span>
                      <Login />
                    </div>
                  </div>
        )}           
        <footer>
          Example 2023 © Todos los derechos reservados
        </footer>    
  </AppContext.Provider> 
  );
}

export default App;
