import React, { useContext, useState } from 'react';
import Selector from '../Componentes/Selector';
import { AppContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { marcas } from '../Componentes/Variables'

export const opciones = [{
  categoria: 'marca',
  opciones: marcas
 }]

function Category( { category } ) {
  const { products, setProducts } = useContext(AppContext);
  const { opcionSeleccionada, setOpcionSeleccionada } = useContext(AppContext);
  

function mostrarCategoría (arregloProductos) {
  const filtro = arregloProductos.filter(x=> {
    if(category==='Niños') {
      return x.category===( 'Niño'||'Niña')
    } else {
      return x.category === category
    }
  })
  return filtro
}

function filtrarPrecios () {

}

function showAll( array ) {
   return array.map(arreglo => (
    <div key={arreglo._id}>
      <NavLink to={`/productos/${arreglo._id}`}>
        <img src={arreglo.url} alt={arreglo.name} />
        <div className='textoProductos'> 
          <p>Marca: {arreglo.marca}</p>
          <h5>{arreglo.name}</h5>
          <p>Precio: {`${arreglo.price.toFixed(2)}`}</p>
          <p>Stock: {arreglo.stock}</p>
        </div>
      </NavLink>
    </div>
  ))
}

  return (
    <div className='productosConTodo'>
      <Selector />
      <div className='productosContenedor'>
      <h2>{category}</h2>
      <div className='productos'>
      
      {products&&(opcionSeleccionada.length>0?showAll(mostrarCategoría(products).filter(y => opcionSeleccionada.some((z)=>y[z.categoria]===z.opcion))):showAll(mostrarCategoría(products)))}
      
      </div>
      </div>
    </div>
    
  );
}

export default Category;