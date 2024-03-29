import Newsletter from '../../components/Newsletter/Newsletter'
import { GiChart } from "react-icons/gi"
import { GiAerialSignal } from "react-icons/gi"
import { PiUsersThreeLight } from 'react-icons/pi'
import { LiaUsersCogSolid } from "../../../node_modules/react-icons/lia";
import "../../styles/Nosotros.css"
import { PropTypes } from "prop-types"

Nosotros.propTypes = {
  tienda: PropTypes.string.isRequired
};

function Nosotros({ tienda }) {
  return (
    <>
      <div id='nosotros'>
        <div>
          <div />
          <h2>{`Acerca de ${tienda}`}</h2>
        </div>
        <div>
          <h1>{`Historia de ${tienda}`}</h1>
          <p>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</p>
        </div>
        <div>
          <h1>Nuestros Valores</h1>
          <div>
            <div>
              <GiChart />
              <h3>Transparencia</h3>
            </div>
            <div>

              <LiaUsersCogSolid />
              <h3>Responsabilidad</h3>
            </div>
            <div>
              <GiAerialSignal />
              <h3>Pasión</h3>
            </div>
            <div>
              <PiUsersThreeLight />
              <h3>Integridad</h3>
            </div>
          </div>
        </div>
      </div>
      <div id='newsletterContenedor'>
        <Newsletter elementString={'https://topitop.vteximg.com.br/arquivos/wf_suscritbe.png?v=637919847774830000'} />
      </div>
    </>
  )
}

export default Nosotros