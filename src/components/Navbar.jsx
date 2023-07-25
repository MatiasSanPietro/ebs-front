import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons"; //Search
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const Container = styled.div`
  height: 65px;
  ${mobile({ height: "50px" })}
  background-color:  #ededed;
  border-width: 2px;
  border-radius: 1px;
  border-image: linear-gradient orange, white 0, 1 50%;
  box-shadow: 0 0 5px 0px grey;
  padding-bottom: 0px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const StyledLinkLogo = styled(Link)`
  color: #333;
  cursor: pointer;
  font-weight: bold;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  padding-top: 1px;
  padding-bottom: 1px;
  border-width: 2px;
  text-decoration: none;
  font-size: 2rem;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  border: 1px solid red;
  padding: 5px;
  border-width: 2px;
  ${mobile({ display: "none" })}
`;

const StyledLinkMenuItem = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    color: red;
    background-color: #ededed;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
  }
  transition: all 0.05s ease;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const StyledLinkMenuItemA = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  margin-left: 20px;
  color: red;
  background-color: #ededed;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

// const SearchContainer = styled.div`
//   border: 0px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   margin-right: 2px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;

const Username = styled.div`
  font-size: 20px;
`;

const Frase = styled.div`
  padding-left: 20px;
  padding-right: 5px;
  font-size: 20px;
`;

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    // Leer la información del usuario desde localStorage al cargar el componente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setUser(null);
    // Borrar el usuario de localStorage al cerrar sesión
    localStorage.removeItem("user");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ES</Language>
          <Frase>¡Descubre el sabor auténtico!</Frase>
          {/* <SearchContainer>
            <Search style={{ color: "gray", fontSize: 20 }} />
            <Input placeholder="BUSCAR PRODUCTOS" />
          </SearchContainer> */}
          {user && (
            <>
              <StyledLinkMenuItem to="/grid">GRILLA</StyledLinkMenuItem>
              <StyledLinkMenuItem to="/orders">PEDIDOS</StyledLinkMenuItem>
            </>
          )}
        </Left>
        <Center>
          <StyledLinkLogo to="/">EL BUEN SABOR</StyledLinkLogo>
        </Center>
        <Right>
          {user ? (
            <>
              <Username>¡Hola {user.nombre}!</Username>
              <StyledLinkMenuItem onClick={handleLogout} to="/">
                CERRAR SESIÓN
              </StyledLinkMenuItem>
              {user.rol === "admin" && (
                <>
                  <StyledLinkMenuItemA /*to="/admin"*/>
                    ADMIN
                  </StyledLinkMenuItemA>
                </>
              )}
              <StyledLinkMenuItem to="/Cart">
                <Badge
                  overlap="rectangular"
                  badgeContent={cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                  color="secondary"
                >
                  <ShoppingCartOutlined />
                </Badge>
              </StyledLinkMenuItem>
            </>
          ) : (
            <>
              <StyledLinkMenuItem to="/register">
                REGISTRARSE
              </StyledLinkMenuItem>
              <StyledLinkMenuItem to="/login">
                INICIAR SESION
              </StyledLinkMenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
