import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  AddShoppingCart as AddShoppingCartIcon,
  Search as SearchIcon,
} from "@material-ui/icons/";

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
      options={data?.items || []}
      loading={loading} // query loading state
      getOptionLabel={(option) => {
        const label = `${option.marca}, ${option.modelo}, ${option.descripcion}`;
        return label;
      }}
      renderOption={(option) => (
        <>
          <span>{option.marca}</span>
          <IconButton>
            <AddShoppingCartIcon />
          </IconButton>
        </>
      )}
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
