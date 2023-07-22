import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React, { useState } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  color: #333;
  font-weight: 300;
  text-align: center;
  margin-left: 500px;
  margin-right: 500px;
  margin-top: 0px;
  margin-bottom: 18px;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: white;
  color: black;
  cursor: pointer;
  text-align: center;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  &:hover {
    color: red;
    text-weight: bold;
    background-color: lightgrey;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
  }
  transition: all 0.05s ease;
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin-left: 15px;
`;

const BottomText = styled.p`
  font-size: 18px;
  margin-left: 15px;
`;

const ButtonAdress = styled.button`
  padding: 1px;
  font-weight: 500;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #ededed;
  color: black;
  cursor: pointer;
  text-align: center;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  &:hover {
    color: red;
    text-weight: bold;
    background-color: lightgrey;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
  }
  transition: all 0.05s ease;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px 0px grey;
  background-color: #f0f0f0;
  padding: 10px;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  object-fit: contain;
  margin: 10px;
  box-shadow: 0 0 5px 0px grey;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 200px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-right: 210px;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  background-color: white;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #ededed;
  color: black;
  cursor: pointer;
  text-align: center;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  &:hover {
    color: red;
    text-weight: bold;
    background-color: lightgrey;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
  }
  transition: all 0.05s ease;
`;

const State = styled.div`
  padding: 2px;
`;

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = () => {
    // Lógica para realizar el checkout
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>TU COMPRA</Title>
        <Bottom>
          <Info>
            <TopText>CARRITO (2)</TopText>
            <BottomText>
              <b>Direccion:</b> Calle falsa 312
              <ButtonAdress>Cambiar direccion</ButtonAdress>
            </BottomText>
            <Product>
              <ProductDetail>
                <Image src="https://i.imgur.com/KXI1Cf2.jpg" />
                <Details>
                  <ProductName>
                    <b>PRODUCTO:</b> 2 hamburguesas con papas
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 30</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://i.imgur.com/pCBKeWv.jpg" />
                <Details>
                  <ProductName>
                    <b>PRODUCTO:</b> Cerveza andes
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>1</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 20</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>RESUMEN</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Envio</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Descuento</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <label htmlFor="payment">Método de Pago:</label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={handlePaymentChange}
            >
              <option value="efectivo">EFECTIVO</option>
            </select>
            <Button>COMPRAR AHORA</Button>
            <State>ESTADO PEDIDO: -</State>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
