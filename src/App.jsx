import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { db, auth } from './config/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Login from './pages/LogIn';
import SignUp from './pages/SignIn';
import Home from './pages/Costumer/Home';
import Search from './pages/Costumer/Search';
import AddProducts from './pages/Costumer/AgProducto';
import Cart from './pages/Costumer/Cart';
import { ProductsContextProvider } from './global/ProductContext';
import { CartContextProvider } from './global/CartContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'SignedUpUsersData', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data().Name);
        }
      } else {
        setUser(null);
      }
    });

    // Cleanup the event listener
    return () => {
      unsubscribe();
    };
  }, []); // Eliminamos los parámetros auth y db de la dependencia del efecto

  return (
    <ProductsContextProvider>
      <CartContextProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/addproducts" render={() => <AddProducts user={user} />} />
            <Route path="/search" render={() => <Search user={user} />} />
            <Route path="/cart" render={() => <Cart user={user} />} />
            <Route path="/" render={() => <Home user={user} />} />
          </Switch>
        </div>
      </Router>
      </CartContextProvider>
    </ProductsContextProvider>
  );
};

export default App;
