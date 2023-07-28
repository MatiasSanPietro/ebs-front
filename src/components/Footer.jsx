import { MailOutline, Phone, Room } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  background-color: #ededed;
  display: flex;
  box-shadow: 0 0 5px 0px grey;
  ${mobile({ display: "none" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 20px;
  ${mobile({ display: "none" })}
`;

const Logo = styled.h1`
  ${mobile({ display: "none" })}
`;

const Desc = styled.p`
  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  ${mobile({ display: "none" })}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ display: "none" })}
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  ${mobile({ display: "none" })}
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const ContactItem = styled.div`
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>EL BUEN SABOR</Logo>
        <Desc>
          Saborea la exquisitez en cada bocado. Descubre nuestra amplia variedad
          de platos cuidadosamente preparados con los ingredientes más frescos y
          seleccionados, deleitando tu paladar con una experiencia culinaria
          única. ¡Pide ya y vive una experiencia gastronómica inolvidable con El
          Buen Sabor!
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
