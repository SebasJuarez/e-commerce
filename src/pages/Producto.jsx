import React, { useContext } from 'react';
import ProductsContext from '../global/ProductContext';
import CartContext from '../global/CartContext';
import './Producto.scss';

const Products = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);

  return (
    <>
      {products.length !== 0 && <h1>Productos disponibles en tienda</h1>}
      <div className='products-container'>
        {products.length === 0 && <div>slow internet...no products to display</div>}
        {products.map(product => (
          <div className='product-card' key={product.ProductID}>
            <div className='product-img'>
              <img src={product.ProductImg} alt="not found" />
            </div>
            <div className='product-name'>
              {product.ProductName}
            </div>
            <div className='product-price'>
              Q. {product.ProductPrice}.00
            </div>
            <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>AGREGAR AL CARRITO</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
