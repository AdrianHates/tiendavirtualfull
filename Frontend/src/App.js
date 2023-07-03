import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Informacion from './Componentes/Componentes/Informacion';
import Navegador from './Componentes/Componentes/Navegador';
//datos
import { tienda, backendURL } from './Componentes/Componentes/Variables'
import PagoCompletadoPaypal from './Componentes/Componentes/PagoCompletadoPaypal';

export const AppContext = createContext(); 


function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [solesDolares, setSolesDolares] = useState(null)
  const location = useLocation();
  const isCarritoPage = location.pathname === '/carrito'
  const pagoCompletadoPaypal = location.pathname === '/orden-completada'
  
  useEffect(() => {
      Promise.all([fetch(`${backendURL}/api/get/products`).then(res=>res.json()), fetch(`${backendURL}/api/user/usuarioLog`).then(res=>{
        if (!res.ok) {
          console.log(res.status)
        }
        return res.json()
      }), fetch(`${backendURL}/cambio`).then(res=>res.json())]).then(([productsData, userData, cambioSolesDolares]) => {

        if(!userData.error) {
          setUser(userData)
          }
        setProducts(productsData)
        setLoading(false)
        setSolesDolares(cambioSolesDolares.venta)
    
      }).catch((error) => {
        console.error(error)
        setLoading(false)
        })
  }, []);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return(
    <AppContext.Provider  value={{ user, setLoading, setUser, products, setProducts, setShowModal, opcionSeleccionada, setOpcionSeleccionada, solesDolares }}>
    {loading ? <h1>LOADING ...</h1> : <>
    {pagoCompletadoPaypal ? null : (
      isCarritoPage?null:<Navegador /> )}
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
          <Route path="/orden-completada" element={<PagoCompletadoPaypal />} />
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
        {pagoCompletadoPaypal ? null : <>    
        <Informacion tienda={tienda} />
        <div className='divHr'>
        <hr className='hr'/>
        </div>
        <Contacto />           
        <footer>
          Example 2023 © Todos los derechos reservados
        </footer>
        </>}
        </>}
  </AppContext.Provider> 
  );
}

export default App;
