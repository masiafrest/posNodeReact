import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import AddBtn, { addLinea } from "./AddBtn";

import { useSnackbar } from "notistack";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddItemBtn from "./ItemDialog";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
  recibo = false,
}) {
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  const { enqueueSnackbar } = useSnackbar();
  const [term, setTerm] = useState(initialTerm);
  const updateSearch = (term = "") => {
    updateSearchTerm(term);
    setTerm(term);
  };

  const handleChange = (event, value, reason) => {
    console.log(reason);
    if (reason === "select-option") {
      if (recibo) {
        addLinea(dispatch, pushLinea, enqueueSnackbar, value, lineas, "venta");
        updateSearch();
      } else {
        const selected = `${value.marca}, ${value.modelo}, ${value.descripcion}`;
        updateSearch(selected);
      }
    }
    if (reason === "clear") {
      updateSearch();
    }
  };

  return (
    <Autocomplete
      // data suggestions return from query
      options={data}
      loading={loading} // query loading state
      debug
      noOptionsText={<AddItemBtn />}
      onChange={handleChange}
      getOptionLabel={({
        marca,
        modelo,
        descripcion,
        categorias,
        precio: { precio },
        ubicacion,
        sku,
        barcode,
      }) => {
        const label = `${marca} ${modelo} ${descripcion} ${categorias.nombre} ${ubicacion.tipo} ${ubicacion.dirrecion} ${sku}
        ${barcode} 
        `;
        return label;
      }}
      renderOption={(option) => (
        <>
          <span>
            {option.marca}, {option.modelo}, {option.descripcion}
          </span>
          {recibo ? null : <AddBtn item={option} reciboTipo="venta" />}
        </>
      )}
      inputValue={term}
      onInputChange={(e, value) => {
        updateSearchTerm(value);
        setTerm(value);
      }}
      renderInput={(params) => {
        return <TextField {...params} variant="outlined" label="buscar Item" />;
      }}
    />
  );
}
