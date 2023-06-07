import React from 'react'
import Carrusel from '../Componentes/Carrusel';
import Contacto from '../Componentes/Contacto'
import NewsletterForm from '../Componentes/NewsletterForm';


export const HomePage = () => {
  return (
    <div id="homepage">
      <Carrusel/>
      <div id='newsletterContenedor'>
        <img src='https://topitop.vteximg.com.br/arquivos/wf_suscritbe.png?v=637919847774830000' alt='newsletter' />
        <NewsletterForm />
      </div>
      <Contacto />
    </div>
  );
};
