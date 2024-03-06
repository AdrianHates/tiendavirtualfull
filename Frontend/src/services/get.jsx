import { backendURL } from "../components/Variables";

export async function getDataProductos () {
  const response = await fetch(`${backendURL}/api/get/products`)
  if (!response.ok) {
    throw new Error('Error papi'); // Corrección aquí
  }
  const data = await response.json()
  return data
}

export async function getDataProductosByCategory ( category ) {
  const response = await fetch(`${backendURL}/api/get/products`)
  if (!response.ok) {
    throw new Error('Error al buscar productos por categoría'); // Corrección aquí
  }
  const data = await response.json()
  const dataFiltrado = data.filter( x => x.category === category)
  return dataFiltrado
}

export async function getDataProductoByID ( id ) {
  const response = await fetch(`${backendURL}/api/get/products/${id}`)
  if(!response.ok) {

    throw new Error('Error al buscar producto')
  }

  const data = await response.json()
  return data
}