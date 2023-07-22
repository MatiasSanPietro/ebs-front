import { MailOutline, Phone, Room } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  background-color: #ededed;
  display: flex;
  box-shadow: 0 0 5px 0px grey;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 2px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>EL BUEN SABOR</Logo>
        <Desc>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
          dignissimos itaque in placeat id explicabo nostrum quaerat nisi qui!
          Dicta molestias sint maiores repudiandae, delectus accusamus sapiente
          facere odit libero?
        </Desc>
      </Left>
      <Center>
        <Title>Links</Title>
        <List>
          <ListItem>Pagina principal</ListItem>
          <ListItem>Carrito</ListItem>
          <ListItem>Mi cuenta</ListItem>
          <ListItem>Terminos de servicio</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contacto</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Calle falsa 123
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          contact@elbuensabor.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
