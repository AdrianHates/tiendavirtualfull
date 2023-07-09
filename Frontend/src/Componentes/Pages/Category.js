import React, { useContext, useState } from 'react';
import '../../styles/Category.css'
import Selector from '../Componentes/Selector';
import { AppContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { marcas } from '../Componentes/Variables'
import SelectOptions from '../Componentes/SelectOpcions';

export const opciones = [{
  categoria: 'marca',
  opciones: marcas
 }]

function Category( { category } ) {
  const { products, selectOptionsEstado } = useContext(AppContext);
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

function filtradoSelector (arreglo) {
   return arreglo.filter(x => opcionSeleccionada.some((y)=>x[y.categoria]===y.opcion))
}

function filtradoSelectOptions (arreglo) {
  switch(selectOptionsEstado) {
    case "Menor a mayor": {
    const newArreglo = [...arreglo].sort((a,b) => a.price-b.price)
    return newArreglo
    }
    case "Mayor a menor": {
    const newArreglo = [...arreglo].sort((a,b) => b.price-a.price)
    return newArreglo;
    }
    default: 
    return arreglo;
  }
}

function showAll( array ) {
  console.log(array)
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
      
      <div className='productos'>
      
      {products&&(opcionSeleccionada.length>0?showAll(filtradoSelectOptions(filtradoSelector(mostrarCategoría(products)))):showAll(filtradoSelectOptions(mostrarCategoría(products))))}    
      </div>
      </div>
      <SelectOptions />
    </div>
    
  );
}

export default Category;