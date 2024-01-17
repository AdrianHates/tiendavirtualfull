import React, { useContext } from "react";
import { AppContext } from "../../App";
export default function SelectOptions() {
  const { setSelectOptionsEstado } = useContext(AppContext)
  function changed(event) {
    setSelectOptionsEstado(event.target.value)    
  }
  
  return(
    <select id="select-options" onChange={changed}>
      <option value="">
          Ordenar por
      </option>
      <option value="Menor a mayor">Menor a mayor precio</option>
      <option value="Mayor a menor">Mayor a menor precio</option>
    </select>
  )
}