import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React, { useState, useEffect } from "react";

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

const ButtonAdress = styled.button`
  background: none;
  border: none;
  padding: 10;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
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
  height: 72vh;
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

const ButtonClear = styled.button`
  border: none;
  color: red;
  text-weight: bold;
  background-color: lightgrey;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  margin-top: 10px;
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // const addToCart = (product) => {
  //   setCartItems((prevCartItems) => [...prevCartItems, product]);
  //   localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
  // };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.precio * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 50;
  };

  // Función para eliminar todos los elementos del carrito del localStorage
  const clearCart = () => {
    // Eliminar el ítem "cartItems" del localStorage
    localStorage.removeItem("cartItems");

    // Actualizar el estado del carrito para que quede vacío
    setCartItems([]);
  };

  const increaseQuantity = (productId) => {
    // Buscar el producto en el carrito con el id proporcionado
    const productIndex = cartItems.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      // Clonar el arreglo de cartItems para no modificar el estado directamente
      const updatedCartItems = [...cartItems];

      // Aumentar la cantidad del producto en 1
      updatedCartItems[productIndex].quantity += 1;

      // Actualizar el estado del carrito con la nueva cantidad del producto
      setCartItems(updatedCartItems);

      // Actualizar el localStorage para reflejar los cambios
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const decreaseQuantity = (productId) => {
    // Buscar el producto en el carrito con el id proporcionado
    const productIndex = cartItems.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      // Clonar el arreglo de cartItems para no modificar el estado directamente
      const updatedCartItems = [...cartItems];

      // Disminuir la cantidad del producto en 1
      updatedCartItems[productIndex].quantity -= 1;

      // Si la cantidad del producto llega a 0, eliminar completamente el producto del carrito
      if (updatedCartItems[productIndex].quantity === 0) {
        updatedCartItems.splice(productIndex, 1);

        // Verificar si el carrito está vacío y recargar la página
        if (updatedCartItems.length === 0) {
          setCartItems([]); // Actualizamos el carrito con un arreglo vacío
          localStorage.removeItem("cartItems");
          window.location.reload(); // Recargar la página
          return;
        }
      }

      // Actualizar el estado del carrito con los cambios realizados
      setCartItems(updatedCartItems);

      // Actualizar el localStorage para reflejar los cambios
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>TU COMPRA</Title>
        <Bottom>
          <Info>
            <TopText>
              CARRITO: ({calculateTotalQuantity()} productos en total)
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
              <SummaryItemPrice>$50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${calculateTotal()}</SummaryItemPrice>
            </SummaryItem>
            <label
              htmlFor="payment"
              style={{
                fontWeight: "bold",
                margintop: "10px",
                marginbottom: "10px",
              }}
            >
              Método de Pago:
            </label>
            &nbsp;&nbsp;
            <select
              id="payment"
              value={paymentMethod}
              onChange={handlePaymentChange}
            >
              <option value="efectivo">Efectivo</option>
            </select>
            <State>
              <b>Direccion:</b> Calle falsa 312
              <ButtonAdress>Cambiar</ButtonAdress>
            </State>
            <State>
              <b>Usuario:</b>
            </State>
            <State>
              <b>Telefono:</b>
            </State>
            <Button>COMPRAR AHORA</Button>
            <State>ESTADO PEDIDO: ---</State>
          </Summary>
        </Bottom>
        <ButtonClear onClick={clearCart}>Vaciar Carrito</ButtonClear>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
