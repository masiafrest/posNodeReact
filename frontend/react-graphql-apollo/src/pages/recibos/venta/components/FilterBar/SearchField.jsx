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
      options={data?.ventas || []}
      loading={loading} // query loading state
      onChange={handleChange}
      getOptionLabel={({ cliente, lineas }) => {
        const lineasLabel = lineas.map((linea) => linea.descripcion);
        console.log('lineas label:', lineasLabel.join(' '))
        const label = `${cliente.nombre} ${cliente.telefono} ${lineasLabel.join(' ')}`;
        return label;
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label="buscar recibo "
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
