import React from "react"

export default function CardDatos ( { name, number }) {
  return(
    <div className="card-datos">
        <h3>{name}</h3>
        <p>{number}</p>
    </div>
  )
}