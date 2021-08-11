import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
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
    updateSearch();
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
