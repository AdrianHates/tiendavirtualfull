import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import { HiOutlineIdentification } from 'react-icons/hi2'

function SecuenciaCompra() {
  const [faseCarrito, setFaseCarrito] = useState(1)

  return(
    <div id='secuenciaCompra'>
      
      <div className={`pasoCompra ${faseCarrito===1?'barraSelected':''}`}>
        <AiOutlineShoppingCart />
        <hr className='hrCompra' />
        <div className='compraDescripcion'>{`${faseCarrito===1?'1.Carrito de compras':''}`}</div>
      </div>
      <div className={`pasoCompra ${faseCarrito===2?'barraSelected':''}`}>
        <HiClipboardDocumentList />
        <hr className='hrCompra' />
        <div className='compraDescripcion'>{`${faseCarrito===2?'2. Datos personales':''}`}</div>
      </div>
      <div className={`pasoCompra ${faseCarrito===3?'barraSelected':''}`}>
        <TbTruckDelivery />
        <hr className='hrCompra' />
      </div>
      <div className={`pasoCompra ${faseCarrito===4?'barraSelected':''}`}>
        <HiOutlineIdentification />
        <hr className='hrCompra' />
      </div>
    </div>)
}

export default SecuenciaCompra;