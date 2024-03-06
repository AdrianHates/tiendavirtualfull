import Carrusel from '../../../components/Carrusel/Carrusel';
import Newsletter from '../../../components/Newsletter/Newsletter';
import "./style.css"

export default function HomePage () {
 
  const carrusel = [
    '/carrusel/carrusel-1.jpg', 
    '/carrusel/carrusel-2.jpg', 
    '/carrusel/carrusel-3.jpg', 
  ]
  const newsletter = 'https://topitop.vteximg.com.br/arquivos/wf_suscritbe.png?v=637919847774830000'
    
  return (
    <div id="homepage" style={{viewTransitionName: 'view-homepage'}}>
      <Carrusel array={carrusel}/>
      <div className='ofertas'>
        <img alt='ofertas1' src='https://topitop.vteximg.com.br/arquivos/230810_descanso_desktop_2.png?v=638272176554030000' />
      </div>
      <div className='ofertas'>
        <img alt='promo1' src='https://topitop.vteximg.com.br/arquivos/230817_descanso_desktop_1.png?v=638278202386100000' />
      </div>
      <Newsletter elementString={newsletter} />

    </div>
  );
}
