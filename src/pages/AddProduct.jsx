import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { insertProduct } from "../service/product";
import styled from "styled-components";
import { getAllArticuloinsumos } from "../service/articuloinsumo";
import { Getarticuloinsumodetallebyarticuloinsumoid } from "../service/articuloinsumodetalle";

const BottomEstado = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
`;

const Wrapper = styled.div`
  margin-top: 50px;
  box-shadow: 0 0 5px 0px grey;
  background-color: #f0f0f0;
  padding: 5px;
`;

const AddProduct = () => {
  const [data, setData] = useState({
    imagen: "",
    descr: "",
    precio: "",
    rubro: "",
    titulo: "",
    rubro_secundario: "",
    ingrediente: "",
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

  const {
    imagen,
    descr,
    precio,
    rubro,
    titulo,
    rubro_secundario,
    ingrediente,
  } = data;

  const handleAgregar = () => {
    if (copiedIngredients.length > 0) {
      const ingredientsString = copiedIngredients.join(" / ");
      handleChange("ingrediente", ingredientsString);
    }
  };

  const [articuloinsumos, setArticuloinsumos] = useState([]);
  const [selectedArticulo, setSelectedArticulo] = useState(null);
  const [articuloinsumoDetalle, setArticuloInsumoDetalle] = useState([]);
  const [selectedDetalle, setSelectedDetalle] = useState("");
  const [ingredientString, setIngredientString] = useState("");
  const [copiedIngredients, setCopiedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticuloinsumos();
  }, []);

  useEffect(() => {
    if (selectedArticulo) {
      setLoading(true);
      fetchArticuloInsumoDetalle(selectedArticulo.id);
    }
  }, [selectedArticulo]);

  useEffect(() => {
    if (selectedArticulo && articuloinsumoDetalle.length > 0) {
      const ingredient = `${selectedArticulo.nombre} - ${
        selectedArticulo.unidad_medida
      }, ${
        selectedDetalle === "Seleccionar cantidad"
          ? "Seleccione cantidad"
          : selectedDetalle
      }`;
      setIngredientString(ingredient);
    }
  }, [selectedArticulo, articuloinsumoDetalle, selectedDetalle]);

  const fetchArticuloinsumos = async () => {
    try {
      const data = await getAllArticuloinsumos();
      setArticuloinsumos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArticuloInsumoDetalle = async (articuloinsumoId) => {
    try {
      const data = await Getarticuloinsumodetallebyarticuloinsumoid(
        articuloinsumoId
      );
      setArticuloInsumoDetalle(data);
      setSelectedDetalle("Seleccionar detalle");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selected = articuloinsumos.find(
      (articuloinsumo) => articuloinsumo.id === parseInt(selectedId)
    );
    setSelectedArticulo(selected);
  };

  const handleDetalleChange = (event) => {
    setSelectedDetalle(event.target.value);
  };

  const handleAgregarIngrediente = () => {
    if (selectedArticulo && selectedDetalle !== "Seleccionar cantidad") {
      const ingredient = `${selectedArticulo.nombre} - ${selectedDetalle} ${selectedArticulo.unidad_medida}`;
      setCopiedIngredients([...copiedIngredients, ingredient]);
      setSelectedDetalle("Seleccionar cantidad");
    }
  };

  const detalleOptions = articuloinsumoDetalle.map((detalle) => (
    <option key={detalle.id} value={detalle.cantidad}>
      {detalle.cantidad}
    </option>
  ));

  return (
    <Container className="mt-3">
      <Wrapper>
        <BottomEstado>
          <Label htmlFor="articuloinsumo">Articulo Insumo:</Label>
          <Select
            id="articuloinsumo"
            value={selectedArticulo ? selectedArticulo.id : ""}
            onChange={handleSelectChange}
          >
            <option value="">Seleccione un artículo insumo</option>
            {articuloinsumos.map((articuloinsumo) => (
              <option key={articuloinsumo.id} value={articuloinsumo.id}>
                {articuloinsumo.nombre} - {articuloinsumo.unidad_medida}
              </option>
            ))}
          </Select>

          {loading ? (
            <p>Cargando detalle...</p>
          ) : (
            <div>
              {articuloinsumoDetalle.length > 0 && (
                <div>
                  <Label htmlFor="detalle">Cantidad:</Label>
                  <Select
                    id="detalle"
                    value={selectedDetalle}
                    onChange={handleDetalleChange}
                  >
                    <option value="Seleccionar cantidad">
                      Seleccionar cantidad
                    </option>
                    {detalleOptions}
                  </Select>
                </div>
              )}
            </div>
          )}

          <div>
            {/* <Label htmlFor="ingredientString">
              Ingredientes seleccionados:
            </Label>
            <Input
              type="text"
              id="ingredientString"
              value={ingredientString}
              readOnly
            /> */}
            <Button onClick={handleAgregarIngrediente}>
              Agregar Ingrediente
            </Button>
          </div>

          <div>
            <Label htmlFor="copiedIngredients">Ingredientes:</Label>
            <Textarea
              id="copiedIngredients"
              value={copiedIngredients.join(" / ")}
              onChange={(e) =>
                setCopiedIngredients(e.target.value.split(" / "))
              }
            />
          </div>
        </BottomEstado>
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
              onChange={(e) => handleChange(e.target.name, e.target.value)}
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
          <Button variant="secondary" onClick={handleAgregar}>
            Bloquear ingredientes
          </Button>
          <br></br>
          <br></br>
          <Button variant="primary" type="submit" className="mb-3">
            Enviar
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AddProduct;
