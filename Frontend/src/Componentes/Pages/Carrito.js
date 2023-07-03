import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import MercadoPago from "mercadopago";
import SecuenciaCompra from "../Componentes/SecuenciaCompra";
import Logo from '../Componentes/Logo';
import { HiArrowLongLeft } from 'react-icons/hi2'
import { backendURL } from '../Componentes/Variables';
import { iconoPaypalButton, paypalButton } from '../../svg/iconos';

function Inicial () {
  return(
    <div>      
      <div id='carritoVacio'>
          <h1>Su carrito esta vacio</h1>
          <p>Para seguir comprando, navegar por las categorias en el sitio, o busque su producto</p>
          <NavLink to="/" className='buttonCarrito'>
            Elegir productos
          </NavLink>
      </div>
      <div>
      </div>
     </div>
  )
}

function Carrito() {
  const { user, setUser, solesDolares } = useContext(AppContext);  
  const total = user?user.carts.items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0):null

  async function comprarPaypal () {
    const cambioRealizado = (total / solesDolares).toFixed(2)
    console.log(cambioRealizado)
    console.log(typeof(solesDolares))
    const response = await fetch(`${backendURL}/crear-orden`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cambioRealizado }),
    })
    const data = await response.json()
    window.location.href = data.links[1].href
  }

  const handleRemoveFromCart = async (itemId) => {
    console.log(itemId)
    try {

      const response = await fetch(`${backendURL}/api/removefromcart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
       if (response.ok) {
        console.log(data.message); 
        setUser(data.Usuario)
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al intentar eliminar del carrito');
    }
  };
  
  return (    
    <div id='carrito'>
      <div id='encabezadoCarrito'>
        <div>
          <Logo />
        </div>
        <div>
          <h5>Carrito de Compra</h5>
        </div>
        <div id='regresarComprar'>
          <NavLink to='/'>
            <HiArrowLongLeft /> Seguir comprando
          </NavLink>
        </div>
      </div>
      <SecuenciaCompra />
      <div id='contenedorProductosCarrito'>
        {user&&user.carts.items.length!==0?
        <>
        <table id='productosCarrito'>
          <thead>
            <tr>
              <th></th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          {user.carts.items.map((item) => (
          <tr className='productoCarrito' key={item._id}>
            <td>
              <NavLink to={`/productos/${item.product._id}`}>
                <img className='imagenProductoCarrito' src={item.product.url} alt ={item._id} />
                <p>{item.product.name}</p>
              </NavLink>
            <p>{item.product.brand}</p>
            </td>
            <td>
            <p className='precioProductoCarrito'>{`S/ ${item.product.price.toFixed(2)}`}</p>
            </td>
            <td>
            <p className='cantidadProductoCarrito'>{item.quantity}</p>
            </td>
            <td>
            <p className='precioProductoCarrito'>{`S/ ${(item.quantity * item.product.price).toFixed(2)}`}</p>
            <button onClick={() => handleRemoveFromCart(item._id)}>Eliminar</button>
            </td>
          </tr>
          ))}
          </tbody>
        </table>  
        <div id='resumenCompra'>
          <p id='resumenTitulo'>Resumen de compra</p>
          <div id='total'>
            <p>Total</p>
            <p id='totalCompra'>{`S/ ${total.toFixed(2)}`}</p>
          </div>
          <div id='paypalButton' onClick={comprarPaypal} >{iconoPaypalButton}{paypalButton}</div>
        </div>
        </>
        :<Inicial />}        
      </div> 
    </div>)}

export default Carrito;