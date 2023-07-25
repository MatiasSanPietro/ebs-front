import React from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import styled from "styled-components";

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Home = () => {
  return (
    <div>
      <StickyContainer>
        <Navbar />
      </StickyContainer>
      <Categories />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
