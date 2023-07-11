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

    </div>
  );
};
