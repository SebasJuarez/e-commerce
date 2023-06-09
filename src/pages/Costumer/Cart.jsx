import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../global/CartContext';
import Header from '../Header';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../config/config';
import { onAuthStateChanged } from 'firebase/auth';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import html2canvas from 'html2canvas';
import './Cart.scss';

const Cart = ({ user }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        history.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const generatePDF = async () => {
    try {
      const cartElement = document.getElementById('cart');
      const canvas = await html2canvas(cartElement);
      const imgData = canvas.toDataURL('image/png');

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      const image = await pdfDoc.embedPng(imgData);

      const pageInfo = page.getSize();
      const pageWidth = pageInfo.width;
      const pageHeight = pageInfo.height;

      const imageAspectRatio = image.width / image.height;
      const maxWidth = pageWidth - 20;
      const maxHeight = maxWidth / imageAspectRatio;

      page.drawImage(image, {
        x: 10,
        y: pageHeight - maxHeight - 10,
        width: maxWidth,
        height: maxHeight,
      });

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      page.setFont(font);
      page.setFontSize(12);
      page.drawText('Orden de compra', {
        x: 10,
        y: 10,
        size: 16,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      console.error('Error al generar el PDF', error);
    }
  };

  return (
    <>
      <Header user={user} />
      <>
        {shoppingCart.length !== 0 && <h1>Carrito</h1>}
        <div className='cart-container' id='cart' style={{ height: '500px' }}>
          {shoppingCart.length === 0 && (
            <>
              <div>
                No tienes items en tu carrito de compras
              </div>
              <div>
                <Link to="/">Regresa a la página principal</Link>
              </div>
            </>
          )}
          {shoppingCart &&
            shoppingCart.map(cart => (
              <div className='cart-card' key={cart.ProductID}>
                <div className='cart-img'>
                  <img src={cart.ProductImg} alt="not found" />
                </div>
                <div className='cart-name'>{cart.ProductName}</div>
                <div className='cart-price-orignal'>Rs {cart.ProductPrice}.00</div>
                <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                  <Icon icon={ic_add} size={24} />
                </div>
                <div className='quantity'>{cart.qty}</div>
                <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                  <Icon icon={ic_remove} size={24} />
                </div>
                <div className='cart-price'>
                  Rs {cart.TotalProductPrice}.00
                </div>
                <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                  <Icon icon={iosTrashOutline} size={24} />
                </button>
              </div>
            ))}
          {shoppingCart.length > 0 && (
            <div className='cart-summary'>
              <div className='cart-summary-heading'>
                Resumen del carrito
              </div>
              <div className='cart-summary-price'>
                <span>Precio Total</span>
                <span>{totalPrice}</span>
              </div>
              <div className='cart-summary-price'>
                <span>Cantidad Total</span>
                <span>{totalQty}</span>
              </div>
              <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }} onClick={generatePDF}>
                Generar PDF
              </button>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default Cart;
