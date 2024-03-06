import Carousel from 'react-bootstrap/Carousel';
import './Carrusel.css'
import PropTypes from 'prop-types';

Carrusel.propTypes = {
  array: PropTypes.array.isRequired,
};

function Carrusel({ array }) {

  return (
    <Carousel>
      {array.map((x, i) => <Carousel.Item interval={i === 0 ? 1000 : i === 1 ? 500 : null} key={i}>
        <img
          className="d-block w-100"
          src={x}
          alt={`${i} slide`}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>)}
    </Carousel>
  );
}

export default Carrusel;

