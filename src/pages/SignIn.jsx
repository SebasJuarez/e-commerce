import './signin.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/config'; // Importa tu instancia de autenticación y la base de datos de Firebase

import logo from '../assets/blacksmarketlogo.png';

const Signin = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogInClick = () => {
    history.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crea el usuario utilizando la función de autenticación de Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda los datos del usuario en la colección "SignedUpUsersData"
      const userData = {
        Name: name,
        Email: email,
        Password: password
      };
      await setDoc(doc(db, 'SignedUpUsersData', user.uid), userData);

      // Redirige al usuario a la página de inicio o a otra ruta deseada
      history.push('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin-page">
      <div className="signup-container">
        <div className="logo-container">
          <img src={logo} className="login-logo" />
        </div>
        <h1>Crea una cuenta</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              className="input3"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="input3"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              className="input3"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrate</button>
          <p className="pre">
            Ya tienes una cuenta? <span className="login" onClick={handleLogInClick}>LogIn</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;

