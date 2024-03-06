import PropTypes from 'prop-types';
export default function CardDatos({ name, number }) {
  return (
    <div className="card-datos">
      <h3>{name}</h3>
      <p>{number}</p>
    </div>
  )
}

CardDatos.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};