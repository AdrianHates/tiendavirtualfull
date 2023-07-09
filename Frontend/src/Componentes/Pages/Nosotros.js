import React from "react"
import { FcComboChart } from "react-icons/fc"
import "../../styles/Nosotros.css"
function Nosotros( { src, tienda }) {
  return (
    <div id='nosotros'>
      <div>
        <img src={src} alt={`Acerca de ${tienda}`} />
        <h2>{`Acerca de ${tienda}`}</h2>
      </div>
      <div>
        <h1>{`Historia de ${tienda}`}</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
          <h3>Pasión</h3>
          </div>
          <div>
          <FcComboChart />
          <h3>Integridad</h3>
          </div>
        </div>
      </div>
    </div>)
}

export default Nosotros