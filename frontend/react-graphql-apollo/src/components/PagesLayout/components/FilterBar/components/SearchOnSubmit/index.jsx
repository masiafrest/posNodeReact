import { useState, useRef } from "react";

import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchOnSubmit({ filterState }) {
  let textInput = useRef(null);
  const [filter, dispatch] = filterState;
  const [term, setTerm] = useState(filter);

  const handleChange = (event) => {
    setTerm(event.target.value.toUpperCase());
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "searchOnSubmit", payload: { filter: term, page: 1 } });
    textInput.current.blur();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        fullWidth
        onFocus={() => {
          if (term) {
            setTerm("");
          }
        }}
        autoFocus
        type="search"
        value={term}
        onChange={handleChange}
        inputRef={textInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleOnSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
