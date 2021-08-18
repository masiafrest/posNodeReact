import { useState, createContext } from "react";
import FilterBar from "./FilterBar";

import Pagination from "@material-ui/lab/Pagination";
const FilterBarState = createContext(null);

export default function PagesLayout({
  title,
  SearchField,
  getQuery,
  List,
  CreateDialog }) {
  const filterState = useState("");
  const takeState = useState(5);
  const viewState = useState(false);
  const pageState = useState(1);

  const filterBarState = {
    filterState,
    takeState,
    viewState,
    pageState,
  };

  return (
    <FilterBarState.Provider value={filterBarState}>
      <h1 style={{ textAlign: "center" }}>{title.toUpperCase()}</h1>
      <FilterBar context={FilterBarState}
        SearchField={SearchField}
        getQuery={getQuery}
        queryType={title}
      />
      <hr />
      <List context={FilterBarState} />
      <CreateDialog />
    </FilterBarState.Provider>
  );
}
