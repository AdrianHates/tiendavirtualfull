import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AppContext } from "../../App"

export default function ModalMarcas () {
  const { products, viewNavigate, setEstadoMarcas } = useContext(AppContext)
  return(
    <div>
      <div>
        <NavLink to='/productos/marcas/HAWK' onClick={(event)=>{
          viewNavigate(event, '/productos/marcas/HAWK');
          setEstadoMarcas(false)
        }}>
          HAWK
        </NavLink>
        <NavLink to='/productos/marcas/XIOMI' onClick={(event)=>{
          viewNavigate(event, '/productos/marcas/XIOMI');
          setEstadoMarcas(false)
        }}>
          XIOMI
        </NavLink>
        <NavLink to='/productos/marcas/Wrangler' onClick={(event)=>{
          viewNavigate(event, '/productos/marcas/Wrangler');
          setEstadoMarcas(false)
        }}>
          Wrangler
        </NavLink>
        </div>
    </div>
  )
}