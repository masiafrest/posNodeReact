import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import { addLinea } from "./AddBtn";

import { useSnackbar } from "notistack";
import { TextField, Paper, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddItemBtn from "./ItemDialog";

export default function AutoCompleteItem({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
  recibo = false,
}) {
  const construccion = true;
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  const { enqueueSnackbar } = useSnackbar();
  const [term, setTerm] = useState(initialTerm);
  const updateSearch = (term = "") => {
    updateSearchTerm(term);
    setTerm(term);
  };

  const handleChange = (event, value, reason) => {
    // this value is a object of the item
    if (reason === "select-option") {
      if (recibo) {
        addLinea(dispatch, pushLinea, enqueueSnackbar, value, lineas, "venta");
        updateSearch("");
      } else {
        const selected = `${value.descripcion}`;
        updateSearch("");
      }
    }
    if (reason === "clear") {
      updateSearch();
    }
  };
  const history = useHistory();

  return construccion ? (
    <p>
      en construccion o mejora, buscar en <Link to="/item">item</Link> y tocar
      el carrito para agregar a venta la lista abajo
    </p>
  ) : (
    <Autocomplete
      // data suggestions return from query
      options={data}
      loading={loading} // query loading state
      // debug={recibo}
      noOptionsText={<AddItemBtn />}
      onChange={handleChange}
      getOptionLabel={({ descripcion, categorias }) => {
        const categoriaStr = categorias.map((cat) => cat.nombre).join(", ");
        const label = `${descripcion.trim()} ${categoriaStr}`;
        return label;
      }}
      renderOption={(option, state) => {
        const categorias = option.categorias
          .map((cat) => cat.nombre)
          .join(", ");
        return (
          <Typography>
            {option.descripcion.trim()} {categorias}
          </Typography>
        );
      }}
      inputValue={term}
      onInputChange={(e, value) => {
        setTerm(value.toUpperCase());
        updateSearchTerm(value.toUpperCase());
      }}
      renderInput={(params) => {
        return <TextField {...params} variant="outlined" label="buscar Item" />;
      }}
    />
  );
}
