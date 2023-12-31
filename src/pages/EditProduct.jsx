import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { editProduct, getProductById } from "../service/product";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 50px;
  box-shadow: 0 0 5px 0px grey;
  background-color: #f0f0f0;
  padding: 5px;
`;

const EditProduct = () => {
  const { idProduct } = useParams();

  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({
    id: "",
    titulo: "",
    descr: "",
    precio: "",
    imagen: "",
    rubro: "",
    rubro_secundario: "",
    ingrediente: "",
  });
  const {
    titulo,
    descr,
    precio,
    imagen,
    rubro,
    rubro_secundario,
    ingrediente,
  } = data;

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleChange1 = (name, value) => {
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
        const {
          id,
          titulo,
          descr,
          precio,
          imagen,
          rubro,
          rubro_secundario,
          ingrediente,
        } = product[0];
        setData({
          id,
          titulo,
          descr,
          precio,
          imagen,
          rubro,
          rubro_secundario,
          ingrediente,
        });
      })
      .catch((error) => {
        new Error(error);
        console.log(error);
      });
  }, [mounted, idProduct]);

  return (
    <Container className="mt-3">
      <Wrapper>
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
              onChange={(e) => handleChange1(e.target.name, e.target.value)}
            >
              <option value="">Elegir rubro</option>
              <option value="comida">Comida</option>
              <option value="bebida sin alcohol">Bebida sin alcohol</option>
              <option value="bebida con alcohol">Bebida con alcohol</option>
              <option value="promo">Promo</option>
              <option value="INACTIVO">INACTIVO</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rubro secundario</Form.Label>
            <Form.Select
              name="rubro_secundario"
              value={rubro_secundario}
              onChange={(e) => handleChange1(e.target.name, e.target.value)}
            >
              <option value="">Elegir rubro secundario</option>
              <option value="hamburguesa">Hamburguesa</option>
              <option value="pizza">Pizza</option>
              <option value="pizza rellena">Pizza rellena</option>
              <option value="lomo">Lomo</option>
              <option value="empanadas">Empanadas</option>
              <option value="entradas">Entradas</option>
              <option value="cerveza">Cerveza</option>
              <option value="vino">Vino</option>
              <option value="agua">Agua</option>
              <option value="agua saborizada">Agua saborizada</option>
              <option value="gaseosa">Gaseosa</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insertar ingrediente"
              name="ingrediente"
              value={ingrediente}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Enviar
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default EditProduct;
