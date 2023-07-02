import React, { useContext, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import { promo, devoluciones } from '../Componentes/Variables';
import { backendURL } from '../Componentes/Variables';

function ProductDetails() {
  const { products, setUser, user } = useContext(AppContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products&&products.find(product => product._id === id)

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${backendURL}/api/addtocart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity }),
      });
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setUser(data.Usuario)
        alert(data.message); 
        console.log(data.Usuario)       
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al intentar agregar al carrito');
    }
  };

  return (
    <>
    {product&&<>
    <div className='detalles'>
      <div>
      <img src={product.url} alt={product.name} />
      </div>
      <div>
      <h4>{product.marca}</h4>
      <h4>{product.name}</h4>
      <p><span>Precio:</span><span>{`S/ ${product.price.toFixed(2)}`}</span></p>
      <p>Stock: {product.stock}</p>
      <img src={promo} alt='promo' />
      <label>Cantidad:</label>
      <div>
      <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
      <NavLink to='/cambios-y-devoluciones'>
      <img src= {devoluciones} alt='devoluciones' />
      </NavLink>
      </div>
    </div>
    <div className='descripcion-productos-detalles'>
      <div>
        <h5>Descripcion</h5>
        <p>{product.description}</p>
      </div>
      <div>
        <h5>Caracteristicas</h5>
        <p>xdxdxdxdxd</p>
      </div>
    </div>
    </>
    }
    </>
  );
}

export default ProductDetails;