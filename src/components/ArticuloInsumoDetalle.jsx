import React, { useState, useEffect } from "react";
import { getAllArticuloinsumos } from "../service/articuloinsumo";
import { Getarticuloinsumodetallebyarticuloinsumoid } from "../service/articuloinsumodetalle";

const ArticuloInsumoDetalle = () => {
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
        selectedDetalle === "Seleccionar detalle"
          ? "Seleccione un detalle"
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
    if (selectedArticulo && selectedDetalle !== "Seleccionar detalle") {
      const ingredient = `${selectedArticulo.nombre} - ${selectedArticulo.unidad_medida}, ${selectedDetalle}`;
      setCopiedIngredients([...copiedIngredients, ingredient]);
      setSelectedDetalle("Seleccionar detalle");
    }
  };

  const detalleOptions = articuloinsumoDetalle.map((detalle) => (
    <option key={detalle.id} value={detalle.cantidad}>
      {detalle.cantidad}
    </option>
  ));

  return (
    <div>
      <label htmlFor="articuloinsumo">Articulo Insumo:</label>
      <select
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
      </select>

      {loading ? (
        <p>Cargando detalle...</p>
      ) : (
        <div>
          {articuloinsumoDetalle.length > 0 && (
            <div>
              <label htmlFor="detalle">Detalle:</label>
              <select
                id="detalle"
                value={selectedDetalle}
                onChange={handleDetalleChange}
              >
                <option value="Seleccionar detalle">Seleccionar detalle</option>
                {detalleOptions}
              </select>
            </div>
          )}
        </div>
      )}

      <div>
        <label htmlFor="ingredientString">Ingredientes seleccionados:</label>
        <input
          type="text"
          id="ingredientString"
          value={ingredientString}
          readOnly
        />
        <button onClick={handleAgregarIngrediente}>Agregar Ingrediente</button>
      </div>

      <div>
        <label htmlFor="copiedIngredients">Ingredientes copiados:</label>
        <textarea
          id="copiedIngredients"
          value={copiedIngredients.join("/")}
          onChange={(e) => setCopiedIngredients(e.target.value.split("/"))}
        />
      </div>
    </div>
  );
};

export default ArticuloInsumoDetalle;
