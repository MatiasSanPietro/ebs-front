import React from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getAllPedidos, updatePedido } from "../service/order";
import { useEffect, useState } from "react";
import OrderModal from "../components/OrderModal";

const Container = styled.div``;

const Space = styled.div`
  padding: 35px;
`;

const OrderGrid = () => {
  const [mounted, setMounted] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  useEffect(() => {
    setMounted(true);

    Promise.all([getAllPedidos()])
      .then(([pedidos]) => {
        setPedidos(pedidos);
      })
      .catch((error) => {
        new Error(error);
      });
  }, [mounted]);

  const handleModificar = (pedido) => {
    setSelectedPedido(pedido);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPedido(null);
  };

  const handleSaveChanges = (updatedPedido) => {
    updatePedido(updatedPedido)
      .then((res) => {
        console.log(res);
        // Llamamos a getAllPedidos nuevamente para obtener la lista actualizada de pedidos
        getAllPedidos()
          .then((data) => {
            // Actualizamos el estado con los nuevos datos de pedidos
            setPedidos(data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setShowModal(false);
    setSelectedPedido(null);
  };

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
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.usuario_id}</td>
              <td>{pedido.fecha_pedido}</td>
              <td>{pedido.telefono}</td>
              <td>{pedido.direccion}</td>
              <td>{pedido.metodo_pago}</td>
              <td>{pedido.nombre_usuario}</td>
              <td>{pedido.articulos}</td>
              <td>{pedido.total}</td>
              <td>{pedido.estado}</td>
              <td>
                <Button
                  onClick={() => handleModificar(pedido)}
                  variant="outline-success"
                >
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
      <OrderModal
        pedido={selectedPedido}
        showModal={showModal}
        onCloseModal={handleCloseModal}
        onSaveChanges={handleSaveChanges}
      />
    </Container>
  );
};

export default OrderGrid;
