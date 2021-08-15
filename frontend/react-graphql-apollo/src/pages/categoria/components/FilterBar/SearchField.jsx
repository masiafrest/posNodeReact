import { useState } from "react";
import { TextField } from "@material-ui/core";
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
      options={data}
      loading={loading} // query loading state
      getOptionLabel={(option) => `${option.nombre}`}
      inputValue={term}
      onInputChange={(e, value) => {
        updateSearchTerm(value);
        setTerm(value);
      }}
      renderInput={(params) => {
        return (
          <>
            <span>term: {term}, initialTerm:{initialTerm}</span>
            <TextField
              {...params}
            // fullWidth={false}
            />
          </>
        );
      }}
    />
  );
}
