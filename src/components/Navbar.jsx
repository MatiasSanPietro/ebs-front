import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
// import { Container, Nav, Navbar } from "react-bootstrap";

// const Navigation = () => {
//   return (
//     <Navbar bg="primary" variant="dark">
//       <Container>
//         <Navbar.Brand href="#home">Musical Hendrix</Navbar.Brand>
//         <Nav className="me-auto">
//           <Nav.Link href="/">Home</Nav.Link>
//           <Nav.Link href="/location">Donde estamos</Nav.Link>
//           <Nav.Link href="/list/">Productos</Nav.Link>
//           <Nav.Link href="/grilla-productos/">Grilla</Nav.Link>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

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

const MenuItem = styled.div`
  font-size: 25x;
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

const SearchContainer = styled.div`
  border: 0px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-right: 2px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ES</Language>
          <SearchContainer>
            <Search style={{ color: "gray", fontSize: 20 }} />
            <Input placeholder="BUSCAR PRODUCTOS" />
          </SearchContainer>
          <StyledLinkMenuItem to="/grid">GRILLA</StyledLinkMenuItem>
          <StyledLinkMenuItem to="/orders">PEDIDOS</StyledLinkMenuItem>
        </Left>
        <Center>
          <StyledLinkLogo to="/">EL BUEN SABOR</StyledLinkLogo>
        </Center>
        <Right>
          <StyledLinkMenuItem to="/register">REGISTRARSE</StyledLinkMenuItem>
          <StyledLinkMenuItem to="/login">INICIAR SESION</StyledLinkMenuItem>
          <StyledLinkMenuItem to="/Cart">
            <Badge overlap="rectangular" badgeContent={1} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </StyledLinkMenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
