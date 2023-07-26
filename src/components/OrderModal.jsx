import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const OrderModal = ({ pedido, showModal, onCloseModal, onSaveChanges }) => {
  const [estado, setEstado] = useState("");

  const handleChangeEstado = (e) => {
    setEstado(e.target.value);
  };

  const handleSaveChanges = () => {
    // Asegurarse de que el campo de estado no esté vacío antes de guardar los cambios
    if (estado !== "") {
      onSaveChanges({ ...pedido, estado });
    }
  };

  return (
    <Modal show={showModal} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formEstado">
          <Form.Label>Estado del Pedido</Form.Label>
          <Form.Control
            as="select"
            value={estado}
            onChange={handleChangeEstado}
          >
            <option value="">Elegir estado</option>
            <option value="Estamos recibiendo tu pedido">
              Estamos recibiendo tu pedido
            </option>
            <option value="Tu pedido está en la cocina">
              Tu pedido está en la cocina
            </option>
            <option value="Tu pedido va en camino">
              Tu pedido va en camino
            </option>
            <option value="Ultimo pedido facturado / Puedes realizar otro pedido">
              Pedido facturado
            </option>
            <option value="Pedido cancelado">Pedido cancelado</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
