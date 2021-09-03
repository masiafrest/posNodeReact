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

  return (
    <Autocomplete
      // data suggestions return from query
      options={data}
      loading={loading} // query loading state
      // debug={recibo}
      noOptionsText={<AddItemBtn />}
      onChange={handleChange}
      getOptionLabel={({
        descripcion,
        categorias,
        precio: { precio },
        ubicacion,
        sku,
        barcode,
      }) => {
        const label = `${descripcion} ${sku}`;
        return label;
      }}
      renderOption={(option, state) => {
        return <span>{option.descripcion}</span>;
      }}
      inputValue={term}
      onInputChange={(e, value) => {
        updateSearchTerm(value.toUpperCase());
        setTerm(value.toUpperCase());
      }}
      renderInput={(params) => {
        return <TextField {...params} variant="outlined" label="buscar Item" />;
      }}
    />
  );
}
