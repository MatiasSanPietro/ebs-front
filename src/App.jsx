import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Grid from "./pages/Grid";
import Orders from "./pages/Orders";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { UserProvider } from "./context/UserContext";

// const App = () => {
//   return <Home />;
// };

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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/cart",
//     element: <Cart />,
//   },
//   {
//     path: "/grid",
//     element: <Grid />,
//   },
//   {
//     path: "/orders",
//     element: <Orders />,
//   },
//   {
//     path: "/agregar-producto",
//     element: <AddProduct />,
//   },
//   {
//     path: "/grilla-productos/:idProduct",
//     element: <EditProduct />,
//   },
// ]);

// function App() {
//   return (
//     <div className="app">
//       <div className="container">
//         <RouterProvider router={router} />
//       </div>
//     </div>
//   );
// }

export default App;
