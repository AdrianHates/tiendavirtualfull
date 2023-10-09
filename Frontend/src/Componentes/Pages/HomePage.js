import React from 'react';
import Carrusel from '../Componentes/Carrusel';
import NewsletterForm from '../Componentes/NewsletterForm';

export default function HomePage () {
 
  return (
    <div id="homepage" style={{viewTransitionName: 'view-homepage'}}>
      <Carrusel/>
      <div id='newsletterContenedor'>
        <img src='https://topitop.vteximg.com.br/arquivos/wf_suscritbe.png?v=637919847774830000' alt='newsletter' />
        <NewsletterForm />
      </div>
      <div className='ofertas'>
        <img alt='ofertas1' src='https://topitop.vteximg.com.br/arquivos/230810_descanso_desktop_2.png?v=638272176554030000' />
      </div>
      <div className='ofertas'>
        <img alt='promo1' src='https://topitop.vteximg.com.br/arquivos/230817_descanso_desktop_1.png?v=638278202386100000' />
      </div>
    </div>
  );
};
