import { backendURL } from "../Componentes/Componentes/Variables";

const requestOptions = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function deleteProducto ( id ) {

  const response = await fetch(`${backendURL}/api/delete/productos/${id}`, requestOptions)

  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }
  return 'Producto eliminado exitosamente';
}