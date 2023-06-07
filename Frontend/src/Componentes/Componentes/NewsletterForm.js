import React, { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aceptarTerminos) { // Verifica si el checkbox está marcado
      alert('Por favor, acepta los términos y condiciones.');
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='newsletter'>
      <h5>SUSCRÍBETE PARA RECIBIR NOVEDADES</h5>
      <p>¡Cupones exclusivos y notificaciones de nuestros mejores eventos!</p>
      <form onSubmit={handleSubmit}>
        <div className='newsletter1'>
          <div>
            <label htmlFor="email">Correo electrónico *</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type='submit'>SUSCRIBIRME</button>
        </div>
        <div className='newsletter2'> 
            <input type="checkbox" id="terminos" checked={aceptarTerminos} onChange={(e) => setAceptarTerminos(e.target.checked)} />
            <label htmlFor="terminos">He leído y acepto la política de protección de datos personales.</label>
        </div>
      </form>
    </div>
  );
}

export default NewsletterForm;