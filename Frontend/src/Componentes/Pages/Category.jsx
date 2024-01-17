import React, { useContext } from 'react';
import '../../styles/Category.css'
import Selector from '../Componentes/Selector';
import { AppContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { marcas } from '../Componentes/Variables'

import SelectOptions from '../Componentes/SelectOpcions';

export const opciones = [
  {
  categoria: 'marca',
  opciones: marcas
 }
]


function Category( { category } ) {
  const { puntoMinMax, toggleSelector, setToggleSelector, products, selectOptionsEstado, viewNavigate, opcionSeleccionada, setEstadoMarcas } = useContext(AppContext);
  
  function toggleSelecctorButton () {
    setToggleSelector(!toggleSelector)
  }

  function mostrarCategoría (arregloProductos) {
    
    const filtro = arregloProductos.filter(x=> {
      if(category==='Niños') {
        return x.category===( 'Niño'||'Niña')
      } else if((category === 'MARCAS-HAWK' || category === 'MARCAS-XIOMI' || category === 'MARCAS-Wrangler')) {
        return x.marca===category.slice(7)
      } else {
        return x.category === category
      }
    })
    if(puntoMinMax) {
    return filtro.filter(x => x.price >= puntoMinMax.min && x.price <= puntoMinMax.max)
    }
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
    return array.map(producto => (
      <div key={producto._id}>
        <NavLink to={`/productos/${producto._id}`} onClick={(event)=>{
          setEstadoMarcas(false)
          viewNavigate(event,`/productos/${producto._id}`)
          
          }}>
          <img src={producto.url[0]} alt={producto.name} style={{viewTransitionName: `view-${producto._id}`}} />
          
          <div className='textoProductos'> 
            <p>Marca: {producto.marca}</p>
            <h5>{producto.name}</h5>
           
            <div>
            <p>Precio: {`/S. ${producto.price.toFixed(2)}`}</p>
            {
              producto.beforePrice?
              <p>Antes: {`/S. ${producto.beforePrice.toFixed(2)}`}</p>:
              null
            }
            </div>
            <p>Stock: {producto.stock}</p>
          </div>
        </NavLink>
        {
          producto.beforePrice?
          <div>
            -{Math.round((producto.beforePrice - producto.price) * 100 / producto.beforePrice)}%
          </div>:
          null
        }
      </div>
    ))
  }

  return (
    <div className='productosConTodo'>
      {!(category.slice(0,6)==='MARCAS')&&<Selector />}
      <div className='productosContenedor'>
      
      <div className='productos' style={{viewTransitionName: 'view-category'}}>
      
      {products && (opcionSeleccionada.length > 0 ?
      showAll(filtradoSelectOptions(filtradoSelector(mostrarCategoría(products)))):
      showAll(filtradoSelectOptions(mostrarCategoría(products))))}    
      </div>
      </div>
      <button className='toggleSelectorButton' onClick={toggleSelecctorButton}>Filtros</button>
      <SelectOptions />
    </div>
    
  );
}

export default Category;