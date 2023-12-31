import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Grid from "./pages/Grid";
import OrderGrid from "./pages/OrderGrid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ArticuloInsumoDetalle from "./components/ArticuloInsumoDetalle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/orders" element={<OrderGrid />} />
        <Route path="/agregar-producto" element={<AddProduct />} />
        <Route path="/grid/:idProduct" element={<EditProduct />} />
        <Route path="/articuloinsumo" element={<ArticuloInsumoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
