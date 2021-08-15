import { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddClientBtn from "../ClienteDialog";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
}) {
  const [term, setTerm] = useState(initialTerm);
  return (
    <Autocomplete
      options={data}
      loading={loading}
      debug={true}
      noOptionsText={<AddClientBtn />}
      inputValue={term}
      onInputChange={(e, value) => {
        updateSearchTerm(value);
        setTerm(value);
      }}
      getOptionLabel={(option) =>
        `${option.nombre}, ${option.telefono}, ${option.dirrecion}`
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
          />
        );
      }}
    />
  );
}
