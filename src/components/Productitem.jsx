import styled from "styled-components";
import React, { useState } from "react";

// const Articulo = styled.h1`
//   font-weight: bold;
//   border-top: 2px solid red;
//   border-bottom: 2px solid red;
//   padding-top: 5px;
//   padding-bottom: 5px;
//   border-width: 2px;
// `;

const Container = styled.div`
  display: flex;
  margin: 10px;
  width: 415px;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: #ededed;
  position: relative;
  box-shadow: 0 0 5px 0px grey;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-right: 10px;
  margin-left: 10px;
  object-fit: cover;
  transition: transform 0s ease;
  border-radius: 10px;
  z-index: ${({ isExpanded }) => (isExpanded ? "9999" : "1")};
  border: ${({ isExpanded }) => (isExpanded ? "2px solid ligthgrey" : "none")};
  ${({ isExpanded }) =>
    isExpanded &&
    `transform: scale(2.8);
    position: absolute;
    margin-left: 132px;`}
  cursor: pointer;
  box-shadow: 0 0 5px 0px grey;
`;

const Desc = styled.div`
  flex: 1;
  font-size: 16px;
`;

const Precio = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1px;
`;

const Button = styled.button`
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 50px;
  border: 2px solid #ededed;
  box-shadow: 0 0 5px 0px grey;
  &:hover {
    color: red;
    background-color: #ededed;
    border: 2px solid red;
  }
  transition: all 0.05s ease;
`;

const Productitem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Container>
      <Image
        src={item.img}
        isExpanded={isExpanded}
        onClick={handleImageClick}
      />
      <Desc>
        {item.desc}
        <Precio>{item.precio}</Precio>
        <Button>AGREGAR</Button>
      </Desc>
    </Container>
  );
};

export default Productitem;
