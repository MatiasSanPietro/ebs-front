import styled from "styled-components";
import Productitem from "./Productitem";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../service/product";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({
    padding: "0px",
  })}
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  margin-left: 10px;
  ${mobile({ paddingTop: 10 })}
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

  // Filtro de rubro
  const comidas = products.filter((item) => item.rubro === "comida");
  const bebidas1 = products.filter(
    (item) => item.rubro === "bebida sin alcohol"
  );
  const bebidas2 = products.filter(
    (item) => item.rubro === "bebida con alcohol"
  );
  const promos = products.filter((item) => item.rubro === "promo");

  const sortByRubroSecundario = (products) => {
    const rubroSecundarioOrder = {
      hamburguesa: 1,
      lomo: 2,
      pizza: 3,
      "pizza rellena": 4,
      empanadas: 5,
      entradas: 6,
      cerveza: 7,
      vino: 8,
      agua: 9,
      "agua saborizada": 10,
      gaseosa: 11,
    };

    return products.slice().sort((a, b) => {
      return (
        rubroSecundarioOrder[a.rubro_secundario] -
        rubroSecundarioOrder[b.rubro_secundario]
      );
    });
  };

  return (
    <Container>
      <Rubro>
        <Title id="promos-section">Promos:</Title>
        <ProductList>
          {sortByRubroSecundario(promos).map((item) => (
            <Productitem item={item} key={item.id} />
          ))}
        </ProductList>
      </Rubro>

      <Rubro>
        <Title id="comidas-section">Comidas:</Title>
        <ProductList>
          {sortByRubroSecundario(comidas).map((item) => (
            <Productitem item={item} key={item.id} />
          ))}
        </ProductList>
      </Rubro>

      <Rubro>
        <Title id="bebidas-section">Bebidas:</Title>
        <ProductList>
          {sortByRubroSecundario(bebidas1).map((item) => (
            <Productitem item={item} key={item.id} />
          ))}
          {sortByRubroSecundario(bebidas2).map((item) => (
            <Productitem item={item} key={item.id} />
          ))}
        </ProductList>
      </Rubro>
    </Container>
  );
};

export default Products;
