import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { SlArrowDown } from 'react-icons/sl'
import { opciones } from '../Pages/Category'



export default function Selector() {

  const objetoConValoresFalse = opciones.reduce((obj, opcion) => {
    obj[opcion.categoria] = false;
    return obj;
  }, {});

  const [ displaySelector, setDisplaySelector ] = useState(objetoConValoresFalse)
  const [puntoClick, setPuntoClick] = useState(false)
  const { opcionSeleccionada, setOpcionSeleccionada, toggleSelector, puntoMinMax, setPuntoMinMax } = useContext(AppContext);
  


  function sphere(event) {
    const contenedorEsfera = document.getElementById('contenedor-sphere')
    const puntos = contenedorEsfera.getBoundingClientRect()
    const distance = puntos.right - puntos.left
    const esfera1 = document.getElementById('sphere-1')
    const esfera2 = document.getElementById('sphere-2')

    const puntosEsfera1 = esfera1.getBoundingClientRect()
    const puntosEsfera2 = esfera2.getBoundingClientRect()
    const radio = (puntosEsfera1.right-puntosEsfera1.left)/2
    const inicial1 = (Math.round((puntosEsfera1.left + radio - puntos.left)*100/distance)/100)*500
    const inicial2 = (Math.round((puntosEsfera2.left + radio - puntos.left)*100/distance)/100)*500

    if(event && event.clientX - puntos.left >= 0 && event.clientX - puntos.right <= 0) {
      const actual = event.clientX

      const prueba1 = actual - (radio + puntosEsfera1.left)
      const prueba2 = actual - (radio + puntosEsfera2.left)

      if(Math.abs(prueba1) > Math.abs(prueba2)) {
        esfera2.style.transform = `translateX(${actual - puntos.right + radio}px)`  
      }
      if(Math.abs(prueba2) >= Math.abs(prueba1)) {
        esfera1.style.transform = `translateX(${actual - puntos.left - radio}px)`  
      }
      const min = Math.min(inicial1, inicial2)
      const max = Math.max(inicial1, inicial2)
      setPuntoMinMax( {min: min, max: max})
     }   

    if(!event) {
      setPuntoMinMax({min:inicial1, max:inicial2})
    } 
  }

  useEffect(() => {
    function convertirFalse () {
      setPuntoClick(false) 
    }

    function convertirTrue (event) {
      if(puntoClick) {
        sphere(event)
      }
    }
    sphere()
    window.addEventListener('mouseup', convertirFalse)
    window.addEventListener('mousemove', convertirTrue)

    return () => {
      window.removeEventListener('mouseup', convertirFalse);
      window.removeEventListener('mousemove', convertirTrue)
    }
  }, [puntoClick])

  function cambioInput (event) {
    const { name, value, checked } = event.target
    
    if(checked) {
      setOpcionSeleccionada(opcionSeleccionada.concat([{ categoria: name, opcion: value}]))
      
    } else {
      setOpcionSeleccionada(opcionSeleccionada.filter(x=>!(x.categoria === name && x.opcion ===value)))
    }
    
  }
  function abrirSelector( elemento  ) {
    displaySelector[elemento]?setDisplaySelector( {...displaySelector, [elemento]: false}):setDisplaySelector( {...displaySelector, [elemento]: true})
  }

  return (
    <>
    <div className={`selector ${toggleSelector?'selectorLive':'selectorDead'}`}>
     
      {opciones.map(x=><div key={x.categoria} className={displaySelector[x.categoria]?'openSelector':'closeSelector'}>
        <div className='flechaBajo'>
          <div>{x.categoria.toUpperCase()}</div>
          <SlArrowDown onClick={() => {
            abrirSelector(x.categoria)
          }} />
        </div>
        
        {x.opciones.map(y=>(
          <div className='opcion-selector' key={y}>
            <input type='checkbox' id={y} name={x.categoria} value={y} onChange={cambioInput} />
            <label htmlFor={y}>{y}</label>
          </div>
        ))}
            
      </div>)}
      <div className={displaySelector["precio"]?'openSelector':'closeSelector'}>
        <div className='flechaBajo'>
          <div>PRECIO</div>
          
          <SlArrowDown onClick={() => {
            abrirSelector("precio")
          }} />
        </div>
        <div>        S/.{puntoMinMax && puntoMinMax.min} - S/.{puntoMinMax && puntoMinMax.max}
</div>
        <div id="contenedor-sphere"
        onDragStart={(e) => e.preventDefault()}
        onMouseDown={(event) => {
          setPuntoClick(true)
          sphere(event)
        }}>
          <div id='sphere-1' ></div>
          <div id='sphere-2' ></div>

        </div>
      </div>    
    </div>
    
    </>
    )
}