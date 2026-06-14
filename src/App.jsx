import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import MovieSearch from "./components/MovieSearch";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<MovieSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;