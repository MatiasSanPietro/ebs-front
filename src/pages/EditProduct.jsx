import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { editProduct, getProductById } from "../service/product";

const EditProduct = () => {
  const { idProduct } = useParams();

  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({
    id: "",
    imagen: "",
    descr: "",
    precio: "",
    rubro: "",
    titulo: "",
  });
  const { imagen, descr, precio, rubro, titulo } = data;

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProduct(data);
    window.location.href = "/grid";
  };

  useEffect(() => {
    setMounted(true);

    Promise.all([getProductById(idProduct)])
      .then(([product]) => {
        const { id, imagen, descr, precio, rubro, titulo } = product[0];
        setData({
          id,
          imagen,
          descr,
          precio,
          rubro,
          titulo,
        });
      })
      .catch((error) => {
        new Error(error);
        console.log(error);
      });
  }, [mounted, idProduct]);

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
          <Form.Control
            type="text"
            placeholder="Insertar rubro"
            name="rubro"
            value={rubro}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
