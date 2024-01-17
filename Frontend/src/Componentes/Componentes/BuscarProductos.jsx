import { useState, useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function BuscarProductos () {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isInputSelected, setIsInputSelected] = useState(false);
  const [maxResultsToShow, setMaxResultsToShow] = useState(5);
  const { products, setEstadoMarcas } = useContext(AppContext)

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if(searchTerm==="" || searchTerm===" ") {
      setIsInputSelected(false)
      return
    }
    setIsInputSelected(true);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const limitedResults = filteredProducts.slice(0, Math.min(maxResultsToShow, filteredProducts.length));
    setSearchResults(limitedResults);
    
  }

  const handleContainerBlur = () => {
    setIsInputSelected(false);
    setSearchTerm("")
  };

  return(
    <div id='buscar-productos' onBlur={handleContainerBlur}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar producto..."
        />
        {isInputSelected && 
        <ul>
          {searchResults.map((product) =>(
          <li key={product._id} onMouseDown={()=>{
            navigate(`/productos/${product._id}`)
            setEstadoMarcas(false)
          }}>
            {product.name}    
          </li>
          ))}
        </ul>}
    </div>
  )
}