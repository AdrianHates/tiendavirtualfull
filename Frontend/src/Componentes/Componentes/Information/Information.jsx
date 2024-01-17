import { NavLink } from 'react-router-dom'
import { opciones } from '../../Pages/Category'
import { BsFacebook, BsLinkedin } from 'react-icons/bs'
import { FaInstagramSquare, FaTiktok, FaYoutubeSquare } from 'react-icons/fa'
import ModalMarcas from '../ModalMarcas'
import './Information.css'

function ComponentInformation ( { object } ) {
  return(
    <div>
      <h5>{object.title}</h5>
      <ul>
        {object.array.map((x,i) => <li key={i}>
          <NavLink to={x.url}>
            {x.text}
          </NavLink>
        </li>)}
      </ul>      
    </div>
  )
}

function Information( { array } ) {
  return(
    <>
    <div className='information'>
      {
        array && array.map((x,i) => <ComponentInformation key={i} object={x}/>)
      }
      <div>
        <h5>Síguenos en</h5>
        <div>
          <BsFacebook />
          <FaInstagramSquare />
          <FaTiktok />
          <FaYoutubeSquare />
          <BsLinkedin />
        </div>
        <NavLink to='/libro-reclamaciones'>
          <img src='https://topitop.vteximg.com.br/arquivos/libro.png?v=638234858971470000' />
          </NavLink>
      </div>
    </div>
    
    </>
  )
}

export default Information