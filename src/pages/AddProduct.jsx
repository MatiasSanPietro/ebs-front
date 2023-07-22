import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { insertProduct } from "../service/product";

const AddProduct = () => {
  const [data, setData] = useState({
    imagen: "",
    descr: "",
    precio: "",
    rubro: "",
    titulo: "",
  });

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    insertProduct(data);
    window.location.href = "/grid";
  };

  const { imagen, descr, precio, rubro, titulo } = data;

  return (
    <Container className="mt-3">
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insertar nombre del producto"
            name="titulo"
            value={titulo}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insertar descripcion"
            name="descr"
            value={descr}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insertar precio"
            name="precio"
            value={precio}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insertar url de la imagen"
            name="imagen"
            value={imagen}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Rubro</Form.Label>
          <Form.Select
            name="rubro"
            value={rubro}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            <option value="">Elegir rubro</option>
            <option value="comida">Comida</option>
            <option value="bebida">Bebida</option>
            <option value="promo">Promo</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
