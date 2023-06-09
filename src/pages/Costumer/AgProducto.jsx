import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../../config/config';
import './AgProducto.scss';
import Header from '../Header';

const AddProducts = ({user}) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg']; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('');
    } else {
      setProductImg(null);
      setError('Por favor elige un tipo de archivo valido (jpg or png)');
    }
  };

  // add product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const storageRef = ref(storage, `product-images/${productImg.name}`);
      await uploadBytes(storageRef, productImg);
      const productImgURL = await getDownloadURL(storageRef);
      await addDoc(collection(db, 'Products'), {
        ProductName: productName,
        ProductPrice: Number(productPrice),
        ProductImg: productImgURL,
      });
      setProductName('');
      setProductPrice(0);
      setProductImg('');
      setError('');
      document.getElementById('file').value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='container'>
        <Header user={user} />
      <br />
      <h2 className='titulo'>Agrega productos nuevos</h2>
      <hr />
      <div className='formdiv'>
        <form autoComplete='off' className='form-group1' onSubmit={addProduct}>
          <label className='label1' htmlFor='product-name'>Nombre del Producto</label>
          <input
            type='text'
            className='form-control'
            required
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
          <br />
          <label className='label1' htmlFor='product-price'>Precio del Producto</label>
          <input
            type='number'
            className='form-control'
            required
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
          />
          <br />
          <label className='label1' htmlFor='product-img'>Agrega una imagen del Producto</label>
          <input
            type='file'
            className='form-control'
            id='file'
            required
            onChange={productImgHandler}
          />
          <br />
          <button type='submit' className='btn btn-success btn-md mybtn'>
            AGREGAR
          </button>
        </form>
        {error && <span className='error-msg'>{error}</span>}
      </div>
    </div>
  );
};

export default AddProducts;