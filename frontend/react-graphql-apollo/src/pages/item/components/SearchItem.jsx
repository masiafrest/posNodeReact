import { useState } from "react";

import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchItem({
  initialTerm,
  updateSearchTerm,
  recibo = false,
}) {
  const [term, setTerm] = useState(initialTerm);

  const handleChange = (event) => {
    setTerm(event.target.value.toUpperCase());
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("clieck term:", term);
        updateSearchTerm(term);
        setTerm("");
      }}
    >
      <TextField
        type="search"
        value={term}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
