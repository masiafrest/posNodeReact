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
      // data suggestions return from query
      options={data?.clientes || []}
      loading={loading} // query loading state
      getOptionLabel={(option) =>
        `${option.nombre}, ${option.telefono}, ${option.dirrecion}`
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            // fullWidth={false}
            variant="outlined"
            value={term} //search term value
            //update search term state on field change
            onChange={(e) => {
              updateSearchTerm(e.target.value);
              setTerm(e.target.value);
            }}
          />
        );
      }}
      debug={true}
      noOptionsText={<AddClientBtn />}
    />
  );
}
