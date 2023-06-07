import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import { HiOutlineIdentification } from 'react-icons/hi2'
function SecuenciaCompra() {
  return(
    <div id='secuenciaCompra'>
      <div className='pasoCompra'>
        <AiOutlineShoppingCart />
        <hr className='hrCompra' />
        <div className='compraDescripcion'>1.Carrito de compras</div>
      </div>
      <div className='pasoCompra'>
        <HiClipboardDocumentList />
        <hr className='hrCompra' />
        <div className='compraDescripcion'>2. Datos personales</div>
      </div>
      <div className='pasoCompra'>
        <TbTruckDelivery />
        <hr className='hrCompra' />
      </div>
      <div className='pasoCompra'>
        <HiOutlineIdentification />
        <hr className='hrCompra' />
      </div>
    </div>)
}

export default SecuenciaCompra;