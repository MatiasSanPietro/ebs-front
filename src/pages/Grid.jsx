import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteProduct, getAllProducts } from "../service/product";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 50px;
`;

const Container = styled.div``;

const Grid = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setMounted(true);

    Promise.all([getAllProducts()])
      .then(([products]) => {
        setProducts(products);
      })
      .catch((error) => {
        new Error(error);
      });
  }, [mounted]);

  const eliminarProducto = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    deleteProduct(id);
  };

  return (
    <Container>
      <Navbar />
      <Button
        href="/agregar-producto"
        variant="success"
        className="mb-3"
        style={{ margin: "20px" }}
      >
        Añadir
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Rubro</th>
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
                <td>{e.precio}</td>
                <td>
                  <StyledImg src={e.imagen}></StyledImg>
                </td>
                <td>{e.rubro}</td>
                <td>
                  <Button href={`/grid/${e.id}`} variant="outline-success">
                    Editar
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => eliminarProducto(e.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Footer />
    </Container>
  );
};

export default Grid;
