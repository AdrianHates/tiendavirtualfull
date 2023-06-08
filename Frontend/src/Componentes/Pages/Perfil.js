import React, { useContext } from 'react'
import { AppContext } from '../../App'

function Perfil () {
  const { user, setUser } = useContext(AppContext);
  return(
    <div>
      {user.username}
    </div>
  )
}

export default Perfil