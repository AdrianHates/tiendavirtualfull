import { backendURL } from "../components/Variables";
const endpoint = "/admin/addProductos"

export async function createProduct(newProductData) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(newProductData), 
  };

  try {
    const response = await fetch(`${backendURL}${endpoint}`, requestOptions);

    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }
    alert('Producto agregado exitosamente');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al agregar producto');
  }
}






