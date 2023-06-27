import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import MercadoPago from "mercadopago";
import SecuenciaCompra from "../Componentes/SecuenciaCompra";
import Logo from '../Componentes/Logo';
import { HiArrowLongLeft } from 'react-icons/hi2'

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
  const { user, setUser } = useContext(AppContext);  
  const [metodoPago, setMetodoPago] = useState(null);
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  
  
  // Calcular el total del carrito
  const total = user?user.carts.items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0):null;

  const handleBuy = () => {
    // Preparar los datos para la pasarela de pago
    setMostrarModal(true);
  }

  const handlePagoTarjeta = () => {
    // Configurar MercadoPago con tu clave pública
    MercadoPago.setPublishableKey("TU_CLAVE_PUBLICA_DE_MERCADOPAGO");

    // Crear una preferencia de pago
    const preference = {
      items: user.carts.items.map((item) => ({
        title: item.product.name,
        unit_price: item.product.price,
        quantity: item.quantity,
      })),
      total_amount: total,
      currency_id: "USD", // Moneda del total de la compra
    };

    // Crear la preferencia de pago en el backend y obtener la URL de pago
    fetch("/api/crear-preferencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirigir al usuario a la URL de pago de MercadoPago
        window.location.href = data.init_point;
      })
      .catch((error) => {
        console.error("Error al crear preferencia de pago:", error);
      });
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await fetch(`/api/removefromcart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        /*setUser(data.Usuario);*/
        alert(data.message); 
        console.log(user);       
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al intentar eliminar del carrito');
    }
  };
console.log(user)
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
        {user?
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
        </table>:<Inicial />}     
      {/* Renderizar el modal de selección de método de pago */}
      {mostrarModal && (
        <div>
          <h2>Selecciona un método de pago:</h2>
          <button onClick={() => setMetodoPago("tarjeta")}>
            Pagar con Tarjeta
          </button>
          <button onClick={() => setMetodoPago("paypal")}>
            Pagar con PayPal
          </button>
        </div>
      )}
      {/* Realizar el pago con el método de pago seleccionado - Corregir todo esto y finalizar*/}
{metodoPago && (
  <div>
    {metodoPago === "tarjeta" && (
      <div>
        {/* Renderizar formulario de pago con tarjeta */}
        <h2>Pago con Tarjeta</h2>
        <form onSubmit={handlePagoTarjeta}>
          {/* Renderizar campos del formulario */}
          <input
            type="text"
            placeholder="Nombre en la tarjeta"
            value={nombreTarjeta}
            onChange={(e) => setNombreTarjeta(e.target.value)}
          />
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fecha de expiración"
            value={fechaExpiracion}
            onChange={(e) => setFechaExpiracion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Código de seguridad"
            value={codigoSeguridad}
            onChange={(e) => setCodigoSeguridad(e.target.value)}
          />
          <button type="submit">Realizar Pago</button>
        </form>
      </div>
    )}
    </div>
    )}
    {user?
    <div id='resumenCompra'>
      <p id='resumenTitulo'>Resumen de compra</p>
      <div id='total'>
        <p>Total</p>
        <p id='totalCompra'>{`S/ ${total.toFixed(2)}`}</p>
      </div>
      <button className='buttonCarrito' onClick={handleBuy}>Ir a comprar</button>
    </div>:null}
    </div>
    </div>)}

export default Carrito;