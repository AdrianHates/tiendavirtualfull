import React, { useState, useEffect } from "react";
import UpdateModal from "./UpdateModal";

export default function CardProductos ( { elemento, elementosSeleccionados, setElementosSeleccionados, id } ) {
  const [isChecked, setIsChecked] = useState(false);
  const [putModal, setPutModal] = useState(false)

  const handleCheckboxChange = ( id ) => {
    const elementos = [...elementosSeleccionados];

    if(isChecked) {
      const filtro = elementos.filter( x => x !== id)
      setElementosSeleccionados(filtro)
      
    } else {
      elementos.push(id)
      setElementosSeleccionados(elementos)
    }
    setIsChecked(!isChecked);
  };

  return(
    <>
    <tr className="card-productos">
        
        <td>
          <input type="checkbox"
          checked={isChecked}
          onChange={
            () => {
              handleCheckboxChange(id)
            }
          } 
          />
        </td>
        <td onClick={
          () => {
            setPutModal(true)
          }
        }>
          <img alt={elemento.name} src={elemento.url[0]} />
          <p>{elemento.name}</p>
          </td>
        <td>{elemento.price}</td>
        <td>{elemento.stock}</td>
    </tr>
    {
      putModal && <UpdateModal  cerrarModal={setPutModal} id={id} />
    }
    </>
  )
}