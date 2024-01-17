import React from "react";
import { useNavigate } from "react-router-dom";

function PagoCompletadoPaypal() {
const navigate = useNavigate()
  function returnPage() {
    navigate('/')
  }
  return <div id='orden-completada'>
      <div className="visto-bueno"></div>
      <h6>Purchase complete successfully</h6>
      <button onClick={returnPage}>Return to page!</button>
      </div>
}

export default PagoCompletadoPaypal