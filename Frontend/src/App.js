import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { flushSync } from 'react-dom';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
//pages
import HomePage from './Componentes/Pages/HomePage';
import RegisterPage from './Componentes/Pages/RegisterPage';
import Carrito from './Componentes/Pages/Carrito';
import Category from './Componentes/Pages/Category'
import ProductDetails from './Componentes/Pages/ProductDetails';
import Nosotros from './Componentes/Pages/Nosotros';
import MiCuenta from './Componentes/Pages/MiCuenta'
import Devoluciones from './Componentes/Pages/Devoluciones';
import Loading from './Componentes/Pages/Loading';
//componentes
import Login from './Componentes/Componentes/Login'
import Contacto from './Componentes/Componentes/Contacto';
import Informacion from './Componentes/Componentes/Informacion';
import Navegador from './Componentes/Componentes/Navegador';
//datos
import { tienda, backendURL } from './Componentes/Componentes/Variables'
import PagoCompletadoPaypal from './Componentes/Componentes/PagoCompletadoPaypal';
import NoMatch from './Componentes/Pages/NoMatch'
export const AppContext = createContext(); 

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [solesDolares, setSolesDolares] = useState(null)
  const [selectOptionsEstado, setSelectOptionsEstado] = useState('')
  const [estadoMarcas, setEstadoMarcas] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [toggleSelector, setToggleSelector] = useState(false)
  const location = useLocation();
  const isCarritoPage = location.pathname === '/carrito'
  const pagoCompletadoPaypal = location.pathname === '/orden-completada'
  const navigate = useNavigate()

  const modifyToggle = () => {
    setToggle(!toggle)
  }

  const viewNavigate = (event, newRoute) => {
    event.preventDefault()
    if (!document.startViewTransition) {
      return navigate(newRoute);
    } else {
      return document.startViewTransition(() => {
        flushSync(() => navigate(newRoute));
      });
    }
  };
  console.log(user)
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
        setSolesDolares(cambioSolesDolares.compra)
    
      }).catch((error) => {
        console.error(error)
        setLoading(false)
        })
  }, []);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return(
    <AppContext.Provider  value={{ user, setLoading, setUser, products, setProducts, setShowModal, opcionSeleccionada, setOpcionSeleccionada, solesDolares, selectOptionsEstado, setSelectOptionsEstado, viewNavigate, estadoMarcas, setEstadoMarcas, toggleSelector, setToggleSelector }}>
    {loading ? <Loading /> : <>
    {pagoCompletadoPaypal ? null : (
      isCarritoPage?null: <><Navegador className={`${toggle?'navLive':'navDead'}`} />        <button onClick={modifyToggle} className='toggleButton'>☰</button></>
      )}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path='/productos/marcas/HAWK' element={<Category category='MARCAS-HAWK' />} />
          <Route path='/productos/marcas/XIOMI' element={<Category category='MARCAS-XIOMI' />} />
          <Route path='/productos/marcas/WRANGLER' element={<Category category='MARCAS-Wrangler' />} />
          <Route path='/productos/categoria/hombre' element={<Category category='Hombre' />} />
          <Route path='/productos/categoria/mujer' element={<Category category='Mujer' />} />
          <Route path='/productos/categoria/niños' element={<Category category='Niños' />} />
          <Route path="/api/users/register" element={<RegisterPage />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/api/user/mi-cuenta" element={<MiCuenta />} />
          <Route path="/productos/:id" element={<ProductDetails />} />
          <Route path="/informacion/nosotros" element={<Nosotros tienda={tienda} src='https://st2.depositphotos.com/1389715/6027/i/600/depositphotos_60278103-stock-photo-brand-new-interior-of-cloth.jpg' />} />
          <Route path="/cambios-y-devoluciones" element={<Devoluciones />} />
          <Route path="/orden-completada" element={<PagoCompletadoPaypal />} />
          <Route path='*' element={<NoMatch />} />  
                 
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
