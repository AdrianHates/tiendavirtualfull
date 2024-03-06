import { useContext } from "react";
import { AppContext } from "../App"
function Pedidos () {
  const { user } = useContext(AppContext)
  console.log(user)
  return(
    <ul id='pedidos'>
      {user&&user.orders.length>0&&user.orders.map((order,i) => { return<li key={i}>
        <p>{`orderID: ${order._id}`}</p>
        <p>{`status: ${order.status}`}</p>
        <p>{`total: S/. ${order.total.toFixed(2)}`}</p>
        <p>{`fecha: ${order.createAt}`}</p>
      </li>})}
    </ul>
  )
}

export default Pedidos