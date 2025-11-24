import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Cart from './components/Cart';
import Auth from './components/Auth';

function App() {
  const [cart, setCart] = useState([]);
  const [, setUser] = useState(null);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="row">
                <div className="col-lg-8">
                  <ProductList addToCart={addToCart} />
                </div>
                <div className="col-lg-4">
                  <Cart 
                    cart={cart} 
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                </div>
              </div>
            } />
            <Route path="/agregar-producto" element={
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <ProductForm />
                </div>
              </div>
            } />
            <Route path="/login" element={
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <Auth setUser={setUser} />
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;