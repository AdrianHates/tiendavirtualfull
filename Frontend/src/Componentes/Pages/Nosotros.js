import React from "react"
import { FcComboChart } from "react-icons/fc"
function Nosotros( { src, tienda }) {
  return (
    <div id='nosotros'>
      <div>
        <img src={src} alt={`Acerca de ${tienda}`} />
        <h2>{`Acerca de ${tienda}`}</h2>
      </div>
      <div>
        <h1>{`Historia de ${tienda}`}</h1>
      </div>
      <div>
        <h1>Nuestros Valores</h1>
        <div>
          <div>
          <FcComboChart />
          <h3>Transparencia</h3>
          </div>
          <div>
          <FcComboChart />
          <h3>Responsabilidad</h3>
          </div>
          <div>
          <FcComboChart />
          <h3>Responsabilidad</h3>
          </div>
          <div>
          <FcComboChart />
          <h3>Responsabilidad</h3>
          </div>
        </div>
      </div>
    </div>)
}

export default Nosotros