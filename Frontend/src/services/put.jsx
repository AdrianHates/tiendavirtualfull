import { backendURL } from "../components/Variables";
const endpoint = "/admin/updateProductos"

export async function updateProduct( id, updateValues ) {

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(updateValues), 
  };

  try {
    const response = await fetch(`${backendURL}${endpoint}/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }
    alert('Producto actualizado exitosamente');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al actualizar el producto');
  }
}

