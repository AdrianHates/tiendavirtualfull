import PropTypes from 'prop-types';
import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AppContext } from '../../App';
import { AiFillShopping } from 'react-icons/ai'
import { userLogin, userPerfil } from '../../svg/iconos';
import BuscarProductos from '../BuscarProductos'
import Logo from '../Logo'
import ModalMarcas from '../ModalMarcas';
import { useLocation } from 'react-router-dom';
import "./navegador.css"

Navegador.propTypes = {
  className: PropTypes.string.isRequired,
};

export default function Navegador({ className }) {

  const { setOpcionSeleccionada, setShowModal, user, viewNavigate, estadoMarcas, setEstadoMarcas } = useContext(AppContext)
  const location = useLocation()
  function resetAll() {
    setOpcionSeleccionada([]);
    if (document.querySelectorAll('input[type="checkbox"]')) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
    setEstadoMarcas(false)
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const mostrarModalMarcas = (event) => {
    event.preventDefault()
    if (estadoMarcas) {
      setEstadoMarcas(false)
    } else {
      setEstadoMarcas(true)
    }
  }

  const sumarCantidades = (user) => {
    return user && user.carts && user.carts.items ? user.carts.items.reduce((total, item) => total + (item.quantity), 0) : 0;
  };
  return (

    <nav id='nav' className={className}>
      <div>
        <div>
          <Logo />
        </div>
        <ul>
          <li>
            <NavLink className={`${location.pathname === '/productos/categoria/mujer' ? 'reactive' : undefined}`} to="/productos/mujer" onClick={(event) => {
              viewNavigate(event, '/productos/categoria/mujer')
              resetAll()
            }}>
              Mujer
            </NavLink>
          </li>
          <li>
            <NavLink to='/productos/hombre' className={`${location.pathname === '/productos/categoria/hombre' ? 'reactive' : undefined}`}
              onClick={(event) => {
                viewNavigate(event, '/productos/categoria/hombre')
                resetAll()
              }}>
              Hombre
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos/categoria/niños" className={`${location.pathname === '/productos/categoria/ni%C3%B1os' ? 'reactive' : undefined}`} onClick={(event) => {
              viewNavigate(event, '/productos/categoria/niños')
              resetAll()
            }}>
              Niños
            </NavLink>
          </li>
          <li>
            <NavLink id='modal-marcas' to='' className={`${location.pathname.match('/productos/marcas/') ? 'reactive-multiple' : undefined}`} onClick={mostrarModalMarcas}>
              Marcas
            </NavLink>
          </li>
        </ul>
        <BuscarProductos />
        <div>
          {
            user && user.rol === 'admin' ?
              <Link id='linkAdministrador' to={'/administrador'}>Admin</Link> :
              null
          }
          {
            user ?
              <NavLink to='/api/user/mi-cuenta' id='mi-cuenta' onClick={() => { setEstadoMarcas(false) }}>
                <div>
                  <div className='iconMiCuenta'>{userPerfil}</div>
                  <div>Mi perfil</div>
                </div>
              </NavLink> :
              <div id='miCuenta' onClick={handleShowModal}>
                <div>
                  <div className='iconMiCuenta'>{userLogin}</div>
                  <div>Iniciar Sessión</div>
                </div>
              </div>
          }
          <NavLink to="/carrito">
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AiFillShopping className='iconMiCuenta' />
              {/*corregir position, translate */}
              <div style={{ position: 'absolute', top: '0.4rem', left: '0', color: 'black', width: '100%', fontWeight: '500', fontSize: '1rem', textAlign: 'center' }}>{sumarCantidades(user)}</div>
              <div>Carrito</div>
            </div>
          </NavLink>
        </div>
      </div>
      {estadoMarcas && <ModalMarcas />}
    </nav>

  )
}