import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { NavLink } from 'react-router-dom';

function Category( { category } ) {
  const { products, setProducts } = useContext(AppContext);
  const { opcionSeleccionada, setOpcionSeleccionada } = useContext(AppContext);
  console.log(opcionSeleccionada)

  const opciones = [{
      categoria: 'brand',
      opciones: ['HAWK', 'XIOMI', 'Wrangler']
     }]
  
  /*const products = [
    {
        "_id": "642a4b6b96e0fd246ba4a4fe",
        "name": "Camisa Hombre Thomas Manga Larga Gris",
        "description": "Topitop ha diseñado prendas para pasar esta temporada de Primavera - Verano con moda y estilo de la marca Hawk. Renueva tu guardarropa con estas Camisas Hombre en el color de tu preferencia y combínalos para armar tu look perfecto\n",
        "price": 99.9,
        "category": "Hombre",
        "brand": "HAWK",
        "url": "https://topitop.vteximg.com.br/arquivos/ids/218591-1000-1248/1816999_1.jpg?v=637694990078900000",
        "__v": 0,
        "stock": 100
    },
    {
        "_id": "642b1266ad7cdea27250cb61",
        "name": "Pantalón Hombre Cesar Beige Safari",
        "description": "Topitop ha diseñado prendas para pasar esta temporada con moda y estilo de la marca Hawk. Renueva tu guardarropa con estos Pantalones para Hombre en el color de tu preferencia y combínalos para armar tu look perfecto\n",
        "price": 129.9,
        "category": "Hombre",
        "brand": "HAWK",
        "url": "https://topitop.vteximg.com.br/arquivos/ids/268129-1000-1248/1887965_1.jpg?v=638043129450770000",
        "__v": 0,
        "stock": 100
    },
    {
        "_id": "642d993eda3bd2482d2b25c8",
        "name": "Blusa Mujer Mercedes Cortita Rojo",
        "description": "Topitop ha diseñado prendas para pasar esta temporada de Primavera - Verano con moda y estilo de la marca Xiomi. Renueva tu guardarropa con estos Blusas Mujer en el color de tu preferencia y combínalos para armar tu look perfecto\n",
        "price": 79.9,
        "category": "Mujer",
        "brand": "XIOMI",
        "url": "https://topitop.vteximg.com.br/arquivos/ids/225508-1000-1248/1828850_1.jpg?v=637738408241770000",
        "stock": 100,
        "__v": 0
    },
    {
        "_id": "642db70236576acf8009ac2f",
        "name": "Wrangler Camisa de manga larga Western Solid Snap para niño, Índigo (Stonewashed Indigo)",
        "description": "Desde 1947, Wrangler ha mantenido un compromiso implacable con la ropa de calidad para toda la familia. Camisetas, jeans e incluso chaquetas y vestidos mantienen a los niños con un aspecto nítido en estilo occidental. Los niños se mantienen cómodos con una cintura ajustable que ayuda a garantizar el ajuste perfecto a medida que crecen. Los estilos juveniles están inspirados en estilos de adultos para que los niños puedan combinar con vaqueros mayores. Construido para soportar los rigores cotidianos de los niños y niñas en juego, Wrangler viste a los niños con auténticas camisetas occidentales y mezclilla duradera para un aspecto característico que está hecho para durar.",
        "price": 108.9,
        "category": "Niño",
        "brand": "Wrangler",
        "url": "https://m.media-amazon.com/images/I/A1NW757eChL._AC_UL1500_.jpg",
        "stock": 100,
        "__v": 0
    }
]*/

const cambioInput = (event) => {
  const { name, value, checked } = event.target
  
  if(checked) {
    setOpcionSeleccionada(opcionSeleccionada.concat([{ categoria: name, opcion: value}]))
  } else {
    setOpcionSeleccionada(opcionSeleccionada.filter(x=>!(x.categoria === name && x.opcion ===value)))
  }
}

const showAll = ( arreglo ) => {
   return arreglo.map(arreglo => (
    <div key={arreglo._id}>
      <NavLink to={`/productos/${arreglo._id}`}>
        <img src={arreglo.url} alt={arreglo.name} />
        <div className='textoProductos'> 
          <p>Marca: {arreglo.brand}</p>
          <h5>{arreglo.name}</h5>
          <p>Precio: {`${arreglo.price}0`}</p>
          <p>Stock: {arreglo.stock}</p>
        </div>
      </NavLink>
    </div>
  ))
}

  return (
    <div className='productosConTodo'>
      <div className='selector'>
      {opciones.map(x=><div key={x.categoria}>{x.categoria}
      {x.opciones.map(y=>(
        <div className='opcion-selector' key={y}>
          <input type='checkbox' id={y} name={x.categoria} value={y} onChange={cambioInput} />
          <label htmlFor={y}>{y}</label>
        </div>
      ))}
      </div>)}
      </div>
      <div className='productosContenedor'>
      <h2>{category}</h2>
      <div className='productos'>
      {/*{products.filter(x=> {
        if(category==='Niños') {
          return x.category===( 'Niño'||'Niña')
        } else {
          return x.category === category
        }
      }).map(products => (
        <div key={products._id}>
          <NavLink to={`/productos/${products._id}`}>
            <img src={products.url} alt={products.name} />
            <div className='textoProductos'> 
              <p>Marca: {products.brand}</p>
              <h5>{products.name}</h5>
              <p>Precio: {`${products.price}0`}</p>
              <p>Stock: {products.stock}</p>
            </div>
          </NavLink>
        </div>
      ))}*/}
      
      {opcionSeleccionada.length>0?showAll((products.filter(x=> {
        if(category==='Niños') {
          return x.category===( 'Niño'||'Niña')
        } else {
          return x.category === category
        }
      })).filter(y =>opcionSeleccionada.some((z)=>y[z.categoria]===z.opcion))):showAll(products.filter(x=> {
        if(category==='Niños') {
          return x.category===( 'Niño'||'Niña')
        } else {
          return x.category === category
        }
      }))}
      
      </div>
      </div>
    </div>
    
  );
}

export default Category;