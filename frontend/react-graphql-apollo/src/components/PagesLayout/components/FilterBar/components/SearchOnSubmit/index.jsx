import { useState, useRef } from "react";

import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

export default function SearchOnSubmit({ filterState, setPage }) {
  let textInput = useRef(null);
  const [filter, setFilter] = filterState;
  const [term, setTerm] = useState(filter);

  const handleChange = (event) => {
    setTerm(event.target.value.toUpperCase());
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFilter(term);
    setPage(1);
    textInput.current.blur();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
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
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => {
                  setTerm("");
                  textInput.current.focus();
                }}
              >
                {term ? <ClearIcon /> : null}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
