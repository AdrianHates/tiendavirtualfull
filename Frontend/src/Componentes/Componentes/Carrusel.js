import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Carrusel() {
  const ofertas = ['https://topitop.vteximg.com.br/arquivos/230410_desktop_3.png?v=638163265091670000', 'https://topitop.vteximg.com.br/arquivos/230410_desktop_2.png?v=638163265088070000']
    
  return (
    <Carousel>
      {ofertas.map((x,i)=><Carousel.Item interval={i===0?1000:i===1?500:null} key={i}>
        <img
          className="d-block w-100"
          src={x}
          alt={`${i} slide`}
        />
        <Carousel.Caption>        
        </Carousel.Caption>
      </Carousel.Item>)}
      {/*<Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
  </Carousel.Item>*/}
    </Carousel>
  );
}

export default Carrusel;