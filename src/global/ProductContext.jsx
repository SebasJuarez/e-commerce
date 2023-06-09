import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/config';

const ProductsContext = createContext();
export default ProductsContext;

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsCollectionRef = collection(db, 'Products'); // Referencia a la colección "Products"

    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      const updatedProducts = snapshot.docChanges().filter((change) => change.type === 'added').map((change) => {
        const { ProductID, ProductName, ProductPrice, ProductImg } = change.doc.data();
        return {
          ProductID,
          ProductName,
          ProductPrice,
          ProductImg
        };
      });

      setProducts((prevProducts) => [...prevProducts, ...updatedProducts]);
    });

    // Al desmontar el componente, detenemos la escucha de cambios
    return () => unsubscribe();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};