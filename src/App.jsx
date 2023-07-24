import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Grid from "./pages/Grid";
import Orders from "./pages/Orders";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/grid" element={<Grid />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/agregar-producto" element={<AddProduct />} />
          <Route path="/grid/:idProduct" element={<EditProduct />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
