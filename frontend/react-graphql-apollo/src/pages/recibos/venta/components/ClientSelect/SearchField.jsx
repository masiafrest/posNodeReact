import { useState } from "react";
import {  TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
}) {
  const [term, setTerm] = useState(initialTerm);
  return (
    <Autocomplete
      // data suggestions return from query
      options={data?.clientes || []}
      loading={loading} // query loading state
      getOptionLabel={(option) => {
        const label = `${option.nombre} ${option.telefono}`;
        return label;
      }}
      renderOption={(option) => <span>{option.nombre}</span>}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
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
