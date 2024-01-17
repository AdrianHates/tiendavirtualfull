import { NavLink } from "react-router-dom";
import './Columns.css'
export default function Columns ( { array } ) {
  return(
  <div className='columns'>
    {
      array.map( (elemento,i) => 
        <NavLink key={i} to={elemento.url}>
          <img src={elemento.urlImg} />
        </NavLink>)
    }
  </div>
  )
}