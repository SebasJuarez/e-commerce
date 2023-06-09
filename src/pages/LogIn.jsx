import './LS.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../config/config';
import logo from '../assets/blacksmarketlogo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUpClick = () => {
    history.push('/signup');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setEmail('');
      setPassword('');
      setError('');
      history.push('/');
    })
    .catch((error) => {
      setError(error.message);
    });
  };

  return (
      <div className="login-page">
        <div className="login-container">
          <div className="logo-container">
            <img src={logo} className="login-logo" alt="Logo" />
          </div>
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico o nombre de usuario</label>
              <input
                className="input2"
                type="email"
                id="email"
                placeholder="Ingresa tu correo electrónico o nombre de usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                className="input2"
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Iniciar sesión</button>
            <p className="pre">
              No tienes una cuenta?{' '}
              <span className="loginqu" onClick={handleSignUpClick}>
                SignUp
              </span>
            </p>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>

  );
};

export default Login;


