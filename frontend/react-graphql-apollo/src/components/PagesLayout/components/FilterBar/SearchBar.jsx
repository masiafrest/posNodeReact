import { useState, useContext } from "react";
import { FilterBarState } from "../..";

import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchItem() {
  const { filterState, pageState } = useContext(FilterBarState);
  const setPage = pageState[1];
  const [filter, setFilter] = filterState;
  const [term, setTerm] = useState(filter);

  const handleChange = (event) => {
    setTerm(event.target.value.toUpperCase());
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("clieck term:", term);
        setFilter(term);
        setPage(1);
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
