import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

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

const TopText = styled.span`
  margin-left: 15px;
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
  border-radius: 10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductDescr = styled.span``;

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

const Summary = styled.div`
  flex: 1;
  background-color: white;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
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
  padding-top: 3px;
  padding-bottom: 3px;
`;

const StyledRemove = styled(Remove)`
  cursor: pointer;
`;

const StyledAdd = styled(Add)`
  cursor: pointer;
`;

const Cart = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [addressError, setAddressError] = useState("");
  const [cartError, setCartError] = useState("");
  const [userError, setUserError] = useState("");
  const { cartItems, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.precio * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 150;
  };

  const [address, setAddress] = useState("");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCheckout = () => {
    if (!storedUser) {
      setUserError("Debe iniciar sesión para continuar.");
      return;
    }

    if (cartItems.length === 0) {
      setCartError("Debe agregar al menos un producto al carrito.");
      return;
    }

    if (!address.trim()) {
      setAddressError("La dirección es obligatoria.");
      return;
    }

    console.log("----- ORDER SUMMARY -----");
    console.log("Usuario:", storedUser.nombre);
    console.log("Telefono:", storedUser.telefono);
    console.log("Direccion:", address);
    console.log("Metodo de pago:", paymentMethod);

    console.log("----- ITEMS IN CART -----");
    cartItems.forEach((item) => {
      console.log("Titulo:", item.titulo);
      console.log("Cantidad:", item.quantity);
      console.log("Total:", item.precio * item.quantity);
    });

    console.log("----- ORDER TOTAL -----");
    console.log("Subtotal:", calculateSubtotal());
    console.log("Envio: $150");
    console.log("Total:", calculateTotal());
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Container>
      <StickyContainer>
        <Navbar />
      </StickyContainer>
      <Wrapper>
        <Title>TU COMPRA</Title>
        <Bottom>
          <Info>
            <TopText>
              CARRITO: (
              {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              productos en total)
            </TopText>
            {cartItems.map((item) => (
              <Product key={item.id}>
                <ProductDetail>
                  <Image src={item.imagen} />
                  <Details>
                    <ProductName>
                      <b>{item.titulo}</b>
                    </ProductName>
                    <ProductDescr>
                      <b>Detalles: </b>
                      {item.descr}
                    </ProductDescr>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <StyledRemove onClick={() => decreaseQuantity(item.id)} />
                    <ProductAmount>({item.quantity})</ProductAmount>
                    <StyledAdd onClick={() => increaseQuantity(item.id)} />
                  </ProductAmountContainer>
                  <ProductPrice>${item.precio * item.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>RESUMEN</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${calculateSubtotal()}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Envio</SummaryItemText>
              <SummaryItemPrice>$150</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                <b>${calculateTotal()}</b>
              </SummaryItemPrice>
            </SummaryItem>
            <State>
              <b>Usuario:</b> {storedUser ? storedUser.nombre : "-"}
            </State>
            <State>
              <b>Telefono:</b> {storedUser ? storedUser.telefono : "-"}
            </State>
            <State>
              <b>Direccion:</b>{" "}
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Ingrese su direccion"
              />
            </State>
            <State>
              <b>Metodo de pago:</b>{" "}
              <select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="efectivo">Efectivo</option>
              </select>
            </State>
            <Button onClick={handleCheckout}>ENVIAR PEDIDO</Button>
            {userError && <p style={{ color: "red" }}>{userError}</p>}
            {cartError && <p style={{ color: "red" }}>{cartError}</p>}
            {addressError && <p style={{ color: "red" }}>{addressError}</p>}
            <State>ESTADO PEDIDO: -</State>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
