import styled from "styled-components";
import Productitem from "./Productitem";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../service/product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Rubro = styled.div``;

const Products = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setMounted(true);

    Promise.all([getAllProducts()])
      .then(([products]) => {
        setProducts(products);
      })
      .catch((error) => {
        new Error(error);
      });
  }, [mounted]);

  // Filter products based on their "rubro" value
  const comidas = products.filter((item) => item.rubro === "comida");
  const bebidas = products.filter((item) => item.rubro === "bebida");
  const promos = products.filter((item) => item.rubro === "promo");

  return (
    <Container>
      <Rubro>
        <Title id="promos-section">Promos:</Title>
        <ProductList>
          {promos.map((item) => (
            <Productitem item={item} key={item.id} />
          ))}
        </ProductList>
      </Rubro>

      <Rubro>
        <Title id="comidas-section">Comidas:</Title>
        <ProductList>
          {comidas.map((item) => (
            <Productitem item={item} key={item.id} />
          ))}
        </ProductList>
      </Rubro>

      <Rubro>
        <Title id="bebidas-section">Bebidas:</Title>
        <ProductList>
          {bebidas.map((item) => (
            <Productitem item={item} key={item.id} />
          ))}
        </ProductList>
      </Rubro>
    </Container>
  );
};

export default Products;
