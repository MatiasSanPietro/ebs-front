import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import Categoryitem from "./Categoryitem";

const Container = styled.div`
  display: flex;
  padding: 25px;
  padding-bottom: 0px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const handleButtonClick = (id) => {
    const sectionElement = document.getElementById(`${id}-section`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container>
      {categories.map((item) => (
        <Categoryitem
          key={item.id}
          item={item}
          onClick={() => handleButtonClick(item.title.toLowerCase())}
        />
      ))}
    </Container>
  );
};

export default Categories;
