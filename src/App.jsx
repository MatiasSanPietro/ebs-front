import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Grid from "./pages/Grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/agregar-producto" element={<AddProduct />} />
        <Route path="/grid/:idProduct" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
