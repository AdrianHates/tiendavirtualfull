import React, { useContext, useState } from 'react'
import { AppContext } from '../../App';
import { SlArrowDown } from 'react-icons/sl'
import { opciones } from '../Pages/Category'

export default function Selector() {
  const [ displaySelector, setDisplaySelector ] = useState(false)
  const { opcionSeleccionada, setOpcionSeleccionada, toggleSelector } = useContext(AppContext);
  
  function cambioInput (event) {
    const { name, value, checked } = event.target
    
    if(checked) {
      setOpcionSeleccionada(opcionSeleccionada.concat([{ categoria: name, opcion: value}]))
      
    } else {
      setOpcionSeleccionada(opcionSeleccionada.filter(x=>!(x.categoria === name && x.opcion ===value)))
    }
    
  }
  
  function abrirSelector() {
    displaySelector?setDisplaySelector(false):setDisplaySelector(true)
  }

  return (
    <div className={`selector ${toggleSelector?'selectorLive':'selectorDead'}`}>
     
      {opciones.map(x=><div key={x.categoria} className={displaySelector?'openSelector':'closeSelector'}>
        <div className='flechaBajo'>
          <div>{x.categoria.toUpperCase()}</div>
          <SlArrowDown onClick={abrirSelector} />
        </div>
        
        {x.opciones.map(y=>(
          <div className='opcion-selector' key={y}>
            <input type='checkbox' id={y} name={x.categoria} value={y} onChange={cambioInput} />
            <label htmlFor={y}>{y}</label>
          </div>
        ))}
            
      </div>)}      
    </div>)
}