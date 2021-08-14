import { useState, createContext } from "react";

const FilterBarState = createContext(null);

export default function PagesLayout({ title, FilterBar, List, CreateDialog }) {
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
      <FilterBar context={FilterBarState} />
      <hr />
      <List context={FilterBarState} />
      <CreateDialog />
    </FilterBarState.Provider>
  );
}
