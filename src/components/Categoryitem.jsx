import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 2px;
  height: 45vh;
  position: relative;
  background-color: #ededed;
  box-shadow: 0 0 5px 0px grey;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const Title = styled.h1`
//   font-size: 25px;
//   color: darkgrey;
//   text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
//     1px 1px 0 black;
//   margin-bottom: 5px;
//   position: absolute;
//   top: 0;
//   padding-bottom: 50px;
//   background-color: #ededed;
// `;

const Button = styled.button`
  font-weight: bold;
  font-size: 15px;
  border: none;
  padding: 10px;
  width: 100%;
  margin: 0;
  background-color: #ededed;
  color: black;
  cursor: pointer;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
  &:hover {
    color: red;
    background-color: #ededed;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
  }
  position: absolute;
  bottom: 0;
  transition: all 0.1s ease;
`;

const Categoryitem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Button>{item.title}</Button>
      </Info>
    </Container>
  );
};

export default Categoryitem;
