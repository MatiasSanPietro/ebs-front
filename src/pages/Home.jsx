import React from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Categories />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
