import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import MovieSearch from "./components/MovieSearch";
import Subscriptions from "./components/Subscriptions";
import CreditCard from "./components/CreditCard";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eztechUser")) || null;
    } catch {
      localStorage.removeItem("eztechUser");
      return null;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      localStorage.removeItem("cart");
      return [];
    }
  });

  const [warning, setWarning] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    const isSubscription = product.type === "subscription" || product.id >= 1 && product.id <= 4;

    setCart((currentCart) => {
      const itemExists = currentCart.find((item) => item.id === product.id);

      if (isSubscription && itemExists) {
        setWarning("This subscription is already in your cart.");
        return currentCart;
      }

      setWarning("");

      if (itemExists) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar cartCount={cartCount} setUser={setUser} />

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
   <Route path="/movie-search" element={<MovieSearch />} />
        <Route
          path="/subscriptions"
          element={<Subscriptions addToCart={addToCart} warning={warning} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />
        <Route path="/credit-card" element={<CreditCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;