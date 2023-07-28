import React from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getAllPedidos, updatePedido } from "../service/order";
import { useEffect, useState } from "react"; //useContext
import OrderModal from "../components/OrderModal";
// import { UserContext } from "../context/UserContext";
import { format } from "date-fns";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px 0px grey;
  background-color: #f0f0f0;
  padding: 5px;
`;

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

const OrderGrid = () => {
  const [mounted, setMounted] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  // const { user } = useContext(UserContext);

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
        getAllPedidos()
          .then((data) => {
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

  // Ordenar los pedidos por fecha de manera descendente
  const sortedPedidos = pedidos.sort((a, b) => {
    const fechaA = new Date(a.fecha_pedido);
    const fechaB = new Date(b.fecha_pedido);
    return fechaB - fechaA;
  });

  // const isAdmin = user && user.rol === "admin";

  // if (!isAdmin) {
  //   return <p>No tienes permiso para ver esta página.</p>;
  // }

  const estadoColors = {
    "Estamos recibiendo tu pedido": "green",
    "Tu pedido está en la cocina": "green",
    "Tu pedido va en camino": "green",
    "Pedido cancelado": "red",
    Facturado: "blue",
  };

  return (
    <Container>
      <Navbar />
      <Title>Pedidos</Title>
      <Button variant="success" className="mb-3" style={{ marginLeft: "40px" }}>
        Grilla pedidos
      </Button>
      <Wrapper>
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
            </tr>
          </thead>
          <tbody>
            {sortedPedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.usuario_id}</td>
                <td>
                  {format(new Date(pedido.fecha_pedido), "dd/MM/yyyy HH:mm")}
                </td>
                <td>{pedido.telefono}</td>
                <td>{pedido.direccion}</td>
                <td>{pedido.metodo_pago}</td>
                <td>{pedido.nombre_usuario}</td>
                <td>{pedido.articulos}</td>
                <td>${pedido.total}</td>
                <td style={{ color: estadoColors[pedido.estado] }}>
                  {pedido.estado}
                </td>
                <td>
                  <Button
                    onClick={() => handleModificar(pedido)}
                    variant="outline-success"
                  >
                    Editar
                  </Button>
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
        <OrderModal
          pedido={selectedPedido}
          showModal={showModal}
          onCloseModal={handleCloseModal}
          onSaveChanges={handleSaveChanges}
        />
      </Wrapper>
    </Container>
  );
};

export default OrderGrid;
