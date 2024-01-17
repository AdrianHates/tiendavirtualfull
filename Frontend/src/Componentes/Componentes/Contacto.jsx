import { MdPlace } from 'react-icons/md';
import { IoIosMail } from 'react-icons/io';
import { AiFillClockCircle } from 'react-icons/ai'

function Contacto() {
  const metodosPago = ['https://topitop.vteximg.com.br/arquivos/ico_visa.png?v=637922106772700000',
  'https://topitop.vteximg.com.br/arquivos/ico_mastercard.png?v=637922106770530000',
  'https://topitop.vteximg.com.br/arquivos/ico_diners.png?v=637922106769100000',
  'https://topitop.vteximg.com.br/arquivos/ico_american.png?v=637922106766930000',
  'https://topitop.vteximg.com.br/arquivos/ico_pagoefectivo.png?v=637922106771600000'

  ]
  return(
    <div id='contactoContenedor'>
      <div id='contacto'>
        <h4>Contacto</h4>
        <div className='contacto1'>
          <div className='contactoDiv'>
            <MdPlace />
            <div>Av. Example 123 - Comas</div>
          </div>
          <div className='contactoDiv'>
            <IoIosMail />
            <div>kurono1807@gmail.com</div>
          </div>
        </div>
        <div className='contactoDiv contacto2'>
          <AiFillClockCircle />
          <div>Horario de atención: L-V 9:00 am a 6:00 pm</div>
        </div>
      </div>
      <hr className='hr' />
      <div id='metodosPago'>
        {metodosPago.map((x,i)=><img src={x} alt={i} key={i} />)}
      </div>
    </div>
  )
}

export default Contacto;
