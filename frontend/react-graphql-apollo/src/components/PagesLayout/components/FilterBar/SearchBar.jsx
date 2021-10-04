import { useState, useContext } from "react";
import { FilterBarState } from "../..";

import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

export default function SearchItem() {
  const { filterState, pageState } = useContext(FilterBarState);
  const setPage = pageState[1];
  const [filter, setFilter] = filterState;
  const [term, setTerm] = useState(filter);

  const handleChange = (event) => {
    setTerm(event.target.value.toUpperCase());
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("clieck term:", term);
    setFilter(term);
    setPage(1);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        type="search"
        value={term}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleOnSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="">
              <IconButton
                onClick={(e) => {
                  setTerm("");
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
