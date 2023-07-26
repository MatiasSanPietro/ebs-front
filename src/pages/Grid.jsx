import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteProduct, getAllProducts } from "../service/product";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 50px;
`;

const Container = styled.div``;

const Grid = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [deletedHistory, setDeletedHistory] = useState([]);

  useEffect(() => {
    setMounted(true);

    // Retrieve the history from localStorage on component mount
    const storedHistory = JSON.parse(localStorage.getItem("deletedHistory"));
    if (storedHistory) {
      setDeletedHistory(storedHistory);
    }

    Promise.all([getAllProducts()])
      .then(([products]) => {
        setProducts(products);
      })
      .catch((error) => {
        new Error(error);
      });
  }, [mounted]);

  const eliminarProducto = (id) => {
    const deletedProduct = products.find((product) => product.id === id);

    // Save the deleted product to the history in localStorage
    setDeletedHistory([...deletedHistory, deletedProduct]);
    localStorage.setItem(
      "deletedHistory",
      JSON.stringify([...deletedHistory, deletedProduct])
    );

    setProducts(products.filter((product) => product.id !== id));
    deleteProduct(id);
  };

  const clearLocalStorage = () => {
    // Clear the data in localStorage for "deletedHistory"
    localStorage.removeItem("deletedHistory");
    // Also, reset the deletedHistory state to an empty array
    setDeletedHistory([]);
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

      <h2>Historial de elementos eliminados:</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Rubro</th>
          </tr>
        </thead>
        <tbody>
          {deletedHistory.map((e, i) => (
            <tr key={i}>
              <td>{e.id}</td>
              <td>{e.titulo}</td>
              <td>{e.descr}</td>
              <td>{e.precio}</td>
              <td>
                <StyledImg src={e.imagen}></StyledImg>
              </td>
              <td>{e.rubro}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Button to clear localStorage */}
      <Button
        variant="danger"
        onClick={clearLocalStorage}
        style={{ margin: "20px" }}
      >
        Borrar Historial de Eliminados
      </Button>
    </Container>
  );
};

export default Grid;
