import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
     // Validación del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, introduce una dirección de correo electrónico válida.');
    return;
  }
  
    const newUser = { username, email, password };

    try {
      const response = await fetch('/api/users/oculto/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      const data = await response.json()

      if (response.ok) {        
        alert(data.message);
        navigate("/api/user/login")
      } else {
        alert(data.error);
      }
    } catch (error) {
      
      console.log('Error:', error);
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Username: </label>
        <input type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Verify Password: </label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <button className='buttonCarrito' type="submit">Registrarse</button>
    </form>
  );
}

export default SignUpForm;