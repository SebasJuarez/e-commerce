import React, { useState, useContext } from 'react';
import ProductsContext from '../../global/ProductContext';
import CartContext from '../../global/CartContext';
import './Search.scss'
import Header from '../Header';

const Search = ({user}) => {
    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);
  
    const [priceFilter, setPriceFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
  
    const filteredProducts = products.filter(product => {
      const productName = product.ProductName.toLowerCase();
      const productPrice = product.ProductPrice.toString();
    
      // Filtrar por nombre (si se ingresó un valor)
      if (nameFilter && !productName.includes(nameFilter.toLowerCase())) {
        return false;
      }
    
      // Filtrar por precio (si se ingresó un valor)
      if (priceFilter && productPrice !== priceFilter) {
        return false;
      }
    
      return true;
    });
  
    const handleChangePriceFilter = e => {
      setPriceFilter(e.target.value);
    };
  
    const handleChangeNameFilter = e => {
      setNameFilter(e.target.value);
    };
  
    return (
    <div>
        <Header user={user} />
      <div className="search-container">
        <input
          type="text"
          value={nameFilter}
          onChange={handleChangeNameFilter}
          placeholder="Filtrar por nombre"
          className="search-input"
        />
        <input
          type="number"
          value={priceFilter}
          onChange={handleChangePriceFilter}
          placeholder="Filtrar por precio"
          className="search-input"
        />
  
        {/* Renderizar los productos filtrados */}
        {filteredProducts.map(product => (
          <div key={product.ProductID} className="product-card">
            <h3>{product.ProductName}</h3>
            <p className="price">Precio: Q. {product.ProductPrice}</p>
            <img src={product.ProductImg} alt={product.ProductName} className="product-image" />
            <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>AGREGAR AL CARRITO</button>
          </div>
        ))}
      </div>
      </div>
    );
  };
  
  export default Search;