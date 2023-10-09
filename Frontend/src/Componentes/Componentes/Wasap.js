import React from "react"
import { ImWhatsapp } from "react-icons/im"
export default function Wasap ( { num } ) {
  return(
    <a id='wasap' href={`https://wa.me/${num}`} target="_blank" >
      <img src="https://adrianhates.github.io/Burgers/static/media/icone-logo-whatsapp-vert.3c88a2148dbf6e49dfae.png" />
    </a>
  )
}