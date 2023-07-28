import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { insertPedido, getLastPedidoByUserId } from "../service/order";

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
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  margin-left: 15px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px 0px grey;
  background-color: #f0f0f0;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const BottomEstado = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px 0px grey;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 10px;
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

const ProductName = styled.span`
  font-size: 20px;
`;

const ProductDescr = styled.span`
  font-size: 20px;
`;

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
  ${mobile({ margin: "0px", marginRight: "0px" })}
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
  ${mobile({ marginBottom: "0px", marginRight: "350px" })}
`;

const Summary = styled.div`
  flex: 1;
  background-color: white;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 690px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  padding-top: 10px;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const SummaryItemPrice = styled.span`
  font-size: 24px;
`;

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
  const [pedidoEstado, setPedidoEstado] = useState("");
  const [pedidoDireccion, setPedidoDireccion] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [addressError, setAddressError] = useState("");
  const [cartError, setCartError] = useState("");
  const [userError, setUserError] = useState("");
  const [selectedOption, setSelectedOption] = useState("address");
  const [address, setAddress] = useState("");
  const { cartItems, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.precio * item.quantity,
      0
    );
  };

  const calculateShippingCost = () => {
    return selectedOption === "address" ? 150 : 0;
  };

  const calculateDiscount = () => {
    return selectedOption === "local" ? calculateSubtotal() * 0.1 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost() - calculateDiscount();
  };

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
    const isConfirmed = window.confirm("¿Completar pedido y enviar?");

    if (isConfirmed) {
      // Crea el objeto de pedido con los datos requeridos
      const newPedido = {
        usuario_id: storedUser.id,
        fecha_pedido: new Date().toISOString(),
        telefono: storedUser.telefono,
        direccion: address,
        metodo_pago: paymentMethod,
        nombre_usuario: storedUser.nombre,
        articulos: cartItems
          .map((item) => `${item.titulo} (${item.quantity})`)
          .join(", "),
        total: calculateTotal(),
        estado: "Estamos recibiendo tu pedido",
      };

      // Inserta el nuevo pedido utilizando el servicio insertPedido
      insertPedido(newPedido)
        .then((res) => {
          console.log("Pedido insertado:", res);
          window.location.href = "/Cart";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    // Cargar el estado del ultimo pedido
    if (storedUser) {
      getLastPedidoByUserId(storedUser.id)
        .then((pedido) => {
          if (pedido && pedido.length > 0) {
            setPedidoEstado(pedido[0].estado);
          } else {
            setPedidoEstado("No se ha realizado un pedido");
          }
        })
        .catch((err) => {
          console.log(err);
          setPedidoEstado("Error al obtener el estado del pedido");
        });
    }
  }, [storedUser]);

  useEffect(() => {
    // Cargar el estado del la ultima direccion
    if (storedUser) {
      getLastPedidoByUserId(storedUser.id)
        .then((pedido) => {
          if (pedido && pedido.length > 0) {
            setPedidoDireccion(pedido[0].direccion);
          } else {
            setPedidoDireccion("-");
          }
        })
        .catch((err) => {
          console.log(err);
          setPedidoDireccion("Error al obtener la direccion del pedido");
        });
    }
  }, [storedUser]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "local") {
      setAddress("Local");
    } else {
      setAddress(""); // Si selecciona "A domicilio" el valor de address se resetea
    }
  };

  useEffect(() => {
    // Limpiar items del carrito despues de 30 minutos
    const timer = setTimeout(() => {
      localStorage.removeItem("cartItems");
    }, 1800000);
    return () => clearTimeout(timer);
  }, []);

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
            <BottomEstado>
              <State>
                <b>Estado ultimo pedido: </b>
                {pedidoEstado}
                <br></br>
                <b>Para la direccion: </b>
                {pedidoDireccion}
                <br></br>
                {/* <b>Usted tendra su pedido a las: </b> */}
              </State>
            </BottomEstado>
            <SummaryTitle>RESUMEN</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Envio</SummaryItemText>
              <SummaryItemPrice>${calculateShippingCost()}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Descuento 10%</SummaryItemText>
              <SummaryItemPrice>-${calculateDiscount()}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
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
              <b>Forma de entrega:</b>
              <br />
              <input
                type="radio"
                value="local"
                checked={selectedOption === "local"}
                onChange={handleOptionChange}
              />{" "}
              Retiro en el local
              <br />
              <input
                type="radio"
                value="address"
                checked={selectedOption === "address"}
                onChange={handleOptionChange}
              />{" "}
              A domicilio
            </State>
            <State>
              {selectedOption === "address" ? (
                <>
                  <b>Direccion:</b>{" "}
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Ingrese su direccion"
                  />
                </>
              ) : (
                <>
                  <b>Retiro en el local</b>
                </>
              )}
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
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
