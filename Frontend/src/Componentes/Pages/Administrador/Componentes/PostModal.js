import React, { useContext, useState } from "react";
import { createProduct } from "../../../../services/post";
import { AppContext } from "../../../../App";



export default function PostModal ( { cerrarModal } ) {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    beforePrice: '',
    category: '',
    marca: '',
    url: ['','','',''],
    stock: '',
  });
  const { actualizarProductos, setActualizarProductos } = useContext(AppContext)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name.startsWith('url-')) {
      const index = parseInt(name.slice(4), 10)
      const updatedUrls = [...formData.url];

      updatedUrls[index] = value;

      setFormData({
        ...formData,
        url: updatedUrls,
      });
    } else {
    setFormData({
      ...formData,
      [name]: value,
    })
    }
  };
  const handleSubmit = (event) => {

    event.preventDefault();
    
    createProduct( formData )

    setFormData({
      name: '',
      description: '',
      price: '',
      beforePrice: '',
      category: '',
      marca: '',
      url:['', '', '', ''],
      stock: '',
    });
    setActualizarProductos((prevState) => !prevState);
  };

  return(
    <div id='post-modal'>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
        </div>
        <div>
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
        </div>
        <div>
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="beforePrice">beforePrice:</label>
            <input
              type="number"
              id="beforePrice"
              name="beforePrice"
              step="0.01"
              min="0"
              value={formData.beforePrice}
              onChange={handleInputChange}
  
            />
        </div>
        <div>
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">--Seleccionar--</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño">Niño</option>
              <option value="Niña">Niña</option>
            </select>
        </div>
            <div>
              <label htmlFor="marca">Marca:</label>
              <input type="text" id="marca" name="marca" value={formData.marca}
              onChange={handleInputChange} required />
            </div>
            <div>   
              <label>Imágenes:</label>
              <div>
              <label htmlFor="url-part-1">URL Parte 1:</label>
              <input onChange={handleInputChange} value={formData.url[0]} type="text" id="url-part-1" name="url-0" required/>

              <label htmlFor="url-part-2">URL Parte 2:</label>
              <input onChange={handleInputChange} value={formData.url[1]} type="text" id="url-part-2" name="url-1" required/>

              <label htmlFor="url-part-3">URL Parte 3:</label>
              <input onChange={handleInputChange} value={formData.url[2]} type="text" id="url-part-3" name="url-2" required/>
              <label htmlFor="url-part-3">URL Parte 4:</label>
              <input onChange={handleInputChange} value={formData.url[3]} type="text" id="url-part-4" name="url-3" required/>
              </div>
            </div>
            <div>
              <label htmlFor="stock">Stock:</label>
              <input min="0" step="1" onChange={handleInputChange} value={formData.stock} type="number" id="stock" name="stock" required />
            </div>
            <div>
              
              <button className='custom-btn btn-9' type="submit">Agregar</button>

              
            </div>
            <button type='button' onClick={
              () => {
                cerrarModal(false)

              }
            }>Close</button>
      </form>
    </div>
  )
}