import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
