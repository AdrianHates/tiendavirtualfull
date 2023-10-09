import React, { useContext, useState } from "react";
import "./index.css"
import CardProductos from "../Componentes/CardProductos";
import PostModal from "../Componentes/PostModal";
import { AppContext } from "../../../../App";
import { deleteProducto } from "../../../../services/delete";
import { mensaje } from "../../../../App";

export default function Productos () {
  const { products, actualizarProductos, setActualizarProductos } = useContext(AppContext)
  const [postModal, setPostModal] = useState(false)
  const [elementosSeleccionados, setElementosSeleccionados] = useState([])

  function formAgregarProductos () {
    setPostModal(true)
  }
  

  async function eliminarTodos() {
    try {
      await Promise.all(elementosSeleccionados.map(id => deleteProducto(id)));
      console.log('Elementos eliminados con éxito');
      setElementosSeleccionados([])
      setActualizarProductos(!actualizarProductos)
      mensaje()
    } catch (error) {
      console.error('Error al eliminar elementos', error);
    }
  }

  return(
    <section id="admin-productos">
      <div>
        <h3>Productos</h3>
        <button onClick={formAgregarProductos} className="custom-btn btn-9">
          Agregar Producto
        </button>
      </div>
       <table>
        <thead>
          <tr>
            <th>N°</th>

            <th>Producto</th>           
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((producto, i) => (
            
              <CardProductos id={producto._id} key={i} i={`${i+1}`} elemento={producto} elementosSeleccionados={elementosSeleccionados}
              setElementosSeleccionados={setElementosSeleccionados} />
            
          ))}
        </tbody>
      </table>
      {
      
    }
    {postModal && <PostModal cerrarModal={setPostModal} />}
    {elementosSeleccionados.length > 0 ? 
    <div id='eliminar-productos'>
      <button className='button-standar-admin-black' onClick={eliminarTodos}>Eliminar</button>
    </div>:
    null}
    </section>
  )
}