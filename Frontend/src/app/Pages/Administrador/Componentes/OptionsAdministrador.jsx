import React from "react"
import { Link } from "react-router-dom"

export default function Administrador () {
  return (
    <nav id='administrador'>
      <Link to='/administrador'>Dashboard</Link>
      <Link to='/administrador/productos'>Productos</Link>
    </nav>

  )
}