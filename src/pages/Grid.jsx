import React, { useEffect, useState } from "react"; //useContext
import { Button, Table } from "react-bootstrap";
import { deleteProduct, getAllProducts } from "../service/product";
import Navbar from "../components/Navbar";
import styled from "styled-components";
// import { UserContext } from "../context/UserContext";
// import { format } from "date-fns";

const StyledImg = styled.img`
  width: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px 0px grey;
  background-color: #f0f0f0;
  padding: 5px;
`;

const Container = styled.div``;

const Title = styled.h2`
  color: #333;
  font-weight: 300;
  text-align: center;
  margin-left: 500px;
  margin-right: 500px;
  margin-top: 10px;
  margin-bottom: 0px;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
`;

const Grid = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  // const { user } = useContext(UserContext);

  useEffect(() => {
    setMounted(true);

    Promise.all([getAllProducts()])
      .then(([products]) => {
        // Ordenar los productos por rubro
        const rubroOrder = [
          "promo",
          "comida",
          "bebida sin alcohol",
          "bebida con alcohol",
          "inactivo",
        ];
        const sortedProducts = products.sort((a, b) => {
          return rubroOrder.indexOf(a.rubro) - rubroOrder.indexOf(b.rubro);
        });
        setProducts(sortedProducts);
      })
      .catch((error) => {
        new Error(error);
      });
  }, [mounted]);

  const estadoColors = {
    inactivo: "red",
  };

  const handleDeleteProduct = (id) => {
    // const isConfirmed = window.confirm(
    //   "¿Estás seguro que quieres eliminar este producto?"
    // );
    // if (isConfirmed) {
    deleteProduct(id)
      .then((response) => {
        console.log("Producto eliminado:", response);
      })
      .catch((error) => {
        console.log("Error al eliminar el producto:", error);
      });
    // }
  };

  return (
    <Container>
      <Navbar />
      <div>
        <Title>Articulo manufacturado</Title>
        <Button
          href="/agregar-producto"
          variant="success"
          className="mb-3"
          style={{ marginLeft: "40px" }}
        >
          Añadir articulo
        </Button>
      </div>
      <Wrapper>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Rubro</th>
              <th>Rubro sec</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((e, i) => (
                <tr key={i}>
                  <td>{e.id}</td>
                  <td>{e.titulo}</td>
                  <td>{e.descr}</td>
                  <td>${e.precio}</td>
                  <td>
                    <StyledImg src={e.imagen}></StyledImg>
                  </td>
                  <td style={{ color: estadoColors[e.rubro] }}>{e.rubro}</td>
                  <td>{e.rubro_secundario}</td>
                  <td>
                    <Button href={`/grid/${e.id}`} variant="outline-success">
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteProduct(e.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Wrapper>
    </Container>
  );
};

export default Grid;
