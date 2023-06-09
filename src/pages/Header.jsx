import React, { useState } from 'react';
import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../config/config'
import './Header.scss';
import { CartContext } from '../global/CartContext';

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();
  const { totalQty } = useContext(CartContext);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };

  return (
    <nav>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Black's Market
        </Link>
        <button
          className="navbar-toggle"
          onClick={handleToggleMenu}
          aria-label="Toggle Menu"
        >
          &#9776;
        </button>
        <div className={`navbar-items ${isMenuOpen ? 'navbar-items-small' : ''}`}>
          {!user && (
            <div className="rightside">
              <Link to="/login" className="navbar-link">
                Iniciar sesión
              </Link>
            </div>
          )}
          {user && (
            <div className="rightside">
              <span>
                <Link to="/" className="navlink">
                  {user}
                </Link>
              </span>
              <Link to="/search" className="navbar-link">
                Buscar
              </Link>
              <Link to="/addproducts" className="navbar-link">
                Agregar Productos
              </Link>
              <Link to="/cart" className="navbar-link">
                <FontAwesomeIcon icon={faShoppingCart} /> Carrito
              </Link>
              <span className='no-of-products'>{totalQty}</span>
              <span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
