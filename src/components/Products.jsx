import styled from "styled-components";
import { products } from "../data";
import Productitem from "./Productitem";

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
  return (
    <Container>
      <Title>Comida:</Title>
      <ProductList>
        {products.map((item) => (
          <Productitem item={item} key={item.id} />
        ))}
      </ProductList>
      <Title>Bebida:</Title>
    </Container>
  );
};

export default Products;
