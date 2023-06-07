import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';

function ProductDetails() {
  const { products, setUser, user } = useContext(AppContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(product => product._id === id);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/addtocart', {
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
        console.log(user)       
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al intentar agregar al carrito');
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.url} alt={product.name} />
      <p>{product.description}</p>
      <p>Precio: {`${product.price}0`}</p>
      <p>Stock: {product.stock}</p>
      <label>Cantidad:</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}

export default ProductDetails;