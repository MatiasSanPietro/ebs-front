import React from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div``;

const Space = styled.div`
  padding: 35px;
`;

const OrderGrid = () => {
  // Test OrderGrid
  const products = [
    {
      id: 1,
      usuario_id: 1,
      fecha_pedido: "2023-07-25",
      telefono: "Usuario 1",
      direccion: "Dirección 1",
      metodo_pago: "Efectivo",
      nombre_usuario: "Usuario 1",
      articulos: "Hamburguesa, pizza, agua",
      total: 100,
      estado: "Recibido",
    },
  ];

  return (
    <Container>
      <Navbar />
      <Space></Space>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#P</th>
            <th>#U</th>
            <th>Fecha Pedido</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Metodo Pago</th>
            <th>Nombre Usuario</th>
            <th>Articulos</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.usuario_id}</td>
              <td>{product.fecha_pedido}</td>
              <td>{product.telefono}</td>
              <td>{product.direccion}</td>
              <td>{product.metodo_pago}</td>
              <td>{product.nombre_usuario}</td>
              <td>{product.articulos}</td>
              <td>{product.total}</td>
              <td>{product.estado}</td>
              <td>
                <Button href={`/grid/${product.id}`} variant="outline-success">
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="outline-danger">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Historial de elementos eliminados:</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#P</th>
            <th>#U</th>
            <th>Fecha Pedido</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Metodo Pago</th>
            <th>Nombre Usuario</th>
            <th>Articulos</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>{/* Render the deleted history data here */}</tbody>
      </Table>

      {/* Button to clear localStorage */}
      <Button
        variant="danger"
        onClick={() => console.log("Clear localStorage")}
        style={{ margin: "20px" }}
      >
        Borrar Historial de Eliminados
      </Button>
      <Footer />
    </Container>
  );
};

export default OrderGrid;
