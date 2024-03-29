import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { BiSolidShow } from 'react-icons/bi'

function Login( { backendURL } ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('')
  const { user, setUser, setShowModal } = useContext(AppContext);


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`${backendURL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json()
      if (response.ok) {
          
        // El usuario ha iniciado sesión correctamente, redirigir a la página principal
        setUser(data.user);
        setShowModal(false);
        alert(data.message);
        
      } else {
        // Las credenciales son inválidas, mostrar un mensaje de error al usuario
        alert('Las credenciales son inválidas');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al intentar iniciar sesión');
    }
  };

  return (
    <form id='login' onSubmit={handleSubmit}>
      <div id='loginEmail'>
        <label>
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />    
      </div>
      <div id='loginContrasena'>
      <label>      
      Contraseña:
      </label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      <div onClick={() => {
        setShowPassword(!showPassword)
      }}><BiSolidShow /></div>
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;