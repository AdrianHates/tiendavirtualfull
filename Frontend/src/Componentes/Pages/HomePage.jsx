import Carrusel from '../Componentes/Carrusel/Carrusel';
import Newsletter from '../Componentes/Newsletter/Newsletter';
import NewsletterForm from '../Componentes/Newsletter/Newsletter';

export default function HomePage () {
 
  const carrusel = [
    'https://topitop.vteximg.com.br/arquivos/240109_desktop_2.png?v=638400694432530000', 
    'https://topitop.vteximg.com.br/arquivos/240109_desktop_4.png?v=638400694434270000',
    'https://topitop.vteximg.com.br/arquivos/240109_desktop_3.png?v=638400694432070000'
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
