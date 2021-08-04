import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { pushLinea } from "../../../../redux/features/reciboSlice";
import AddBtn, { addLinea } from "../AddBtn";
import { useSnackbar } from "notistack";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
      options={data?.items || []}
      loading={loading} // query loading state
      onChange={handleChange}
      getOptionLabel={(option) => {
        const label = `${option.marca}, ${option.modelo}, ${option.descripcion}`;
        return label;
      }}
      renderOption={(option) => (
        <>
          <span>{option.marca}</span>
          {recibo ? null : <AddBtn item={option} reciboTipo="venta" />}
        </>
      )}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="buscar Item"
            // fullWidth={false}
            value={term} //search term value
            //update search term state on field change
            onChange={(e) => {
              updateSearchTerm(e.target.value);
              setTerm(e.target.value);
            }}
          />
        );
      }}
    />
  );
}
