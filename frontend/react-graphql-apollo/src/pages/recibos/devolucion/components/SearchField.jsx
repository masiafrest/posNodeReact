import { useState } from "react";

import { useDispatch } from "react-redux";
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
      options={data}
      loading={loading} // query loading state
      onChange={handleChange}
      getOptionLabel={({ clienteNombre, lineas }) => {
        const lineasLabel = lineas.map((linea) => linea.descripcion);
        const label = `${clienteNombre} ${lineasLabel.join(" ")}`;
        return label;
      }}
      inputValue={term}
      onInputChange={(e, value) => {
        updateSearchTerm(value);
        setTerm(value);
      }}
      renderInput={(params) => {
        return (
          <TextField {...params} variant="outlined" label="buscar recibo " />
        );
      }}
    />
  );
}
