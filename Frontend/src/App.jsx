import './App.css';
import { useState, useEffect, createContext } from 'react';
import { flushSync } from 'react-dom';
import { Routes, Route, useLocation, useNavigate, NavLink } from 'react-router-dom';

//pages
import HomePage from './app/Pages/home-page.jsx/HomePage';
import RegisterPage from './app/Pages/RegisterPage';
import Carrito from './app/Pages/Carrito';
import Category from './app/Pages/Category'
import ProductDetails from './app/Pages/ProductDetails';
import Nosotros from './app/Pages/Nosotros';
import MiCuenta from './app/Pages/MiCuenta'
import Devoluciones from './app/Pages/Devoluciones';
import Loading from './app/Pages/Loading';
import Administrador from './app/Pages/Administrador/Administrador/Administrador';
//pages - administrador
import Productos from './app/Pages/Administrador/Productos';
//componentes
import Login from "./components/Login"
import Contacto from './components/Contacto'
import Information from './components/Information/Information'
import Navegador from './components/Navegador/navegador'; 
import Columns from './components/Columns/Columns';
import WS from './components/WS/WS';

//componentes - administrador
import OptionsAdministrador from './app/Pages/Administrador/Componentes/OptionsAdministrador'
//datos
import { tienda, backendURL, wS, information, columns } from './components/Variables'
import PagoCompletadoPaypal from './components/PagoCompletadoPaypal';
import NoMatch from './app/Pages/NoMatch'
//services
import { getDataProductos } from './services/get';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const message = () => {
  toast('🦄 Eliminando productos', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true) //debe iniciar en true
  const [solesDolares, setSolesDolares] = useState(null)
  const [selectOptionsEstado, setSelectOptionsEstado] = useState('')
  const [estadoMarcas, setEstadoMarcas] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [toggleSelector, setToggleSelector] = useState(false)
  const [puntoMinMax, setPuntoMinMax] = useState(null)
  const [actualizarProductos, setActualizarProductos] = useState(false)
  const location = useLocation();
  const isCarritoPage = location.pathname === '/carrito'
  const panelAdministrador = location.pathname.startsWith('/administrador')
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
  }

  useEffect(() => {
    Promise.all([getDataProductos(), fetch(`${backendURL}/api/user/usuarioLog`).then(res => {
      if (!res.ok) {
        console.log(res.status)
      }
      return res.json()
    }), fetch(`${backendURL}/cambio`).then(res => res.json())]).then(([productsData, userData, cambioSolesDolares]) => {

      if (!userData.error) {
        setUser(userData)
      }
      setProducts(productsData)
      setLoading(false)
      setSolesDolares(cambioSolesDolares.compra)

    }).catch((error) => {
      console.error(error)
      setLoading(false)
    })
  }, [actualizarProductos]);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <AppContext.Provider value={{ actualizarProductos, setActualizarProductos, puntoMinMax, setPuntoMinMax, user, setLoading, setUser, products, setProducts, setShowModal, opcionSeleccionada, setOpcionSeleccionada, solesDolares, selectOptionsEstado, setSelectOptionsEstado, viewNavigate, estadoMarcas, setEstadoMarcas, toggleSelector, setToggleSelector }}>
      {
        loading ?
          <Loading /> :

          <div id="todo" style={{ flexDirection: `${panelAdministrador ? 'row' : 'column'}` }}>
            {
              pagoCompletadoPaypal ?
                null :
                (
                  (isCarritoPage || panelAdministrador) ?
                    null :
                    <>
                      <Navegador className={`${toggle ? 'navLive' : 'navDead'}`} />
                      <button onClick={modifyToggle} className='toggleButton'>☰</button>
                    </>
                )
            }
            {/*Panel Administrador*/}
            {
              panelAdministrador && user && user.rol === 'admin' ?
                <><OptionsAdministrador /><ToastContainer />

                </> :
                null
            }
            <div className='routes-container'>
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
                <Route path="/informacion/nosotros" element={<Nosotros tienda={tienda} src='https://img.freepik.com/fotos-premium/grandes-almacenes-gran-surtido-ropa_88135-23572.jpg?w=900' />} />
                <Route path="/cambios-y-devoluciones" element={<Devoluciones />} />
                <Route path="/orden-completada" element={<PagoCompletadoPaypal />} />
                {
                  user && user.rol === 'admin' ?
                    <>
                      <Route path='/administrador/' element={<Administrador />} />
                      <Route path='/administrador/productos' element={<Productos />} />
                    </> :
                    null
                }
                <Route path='*' element={<NoMatch />} />

              </Routes>
            </div>
            {
              showModal && (
                <div className="modelo">
                  Iniciar Sessión
                  <div className="modelo-content">
                    <span className="close" onClick={handleCloseModal}>
                      Cerrar &times;
                    </span>
                    <Login backendURL={backendURL} />
                    <div >
                      ¿No eres miembro todavía? Registrate <span onClick={handleCloseModal}> <NavLink to='/api/users/register'>
                        Aquí
                      </NavLink></span>
                    </div>
                  </div>
                </div>
              )
            }
            {
              (pagoCompletadoPaypal || panelAdministrador) ?
                null :
                <div>
                  <Columns array={columns} />
                  <Information array={information} />
                  <div className='divHr'>
                    <hr className='hr' />
                  </div>
                  <Contacto />
                  <WS object={wS} />
                  <footer>
                    Example 2023 © Todos los derechos reservados
                  </footer>
                </div>
            }

          </div>

      }
    </AppContext.Provider>
  );
}

export default App;
