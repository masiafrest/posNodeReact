import { useState, createContext } from "react";

const FilterBarState = createContext(null);

export default function PagesLayout({ FilterBar, List, CreateDialog }) {
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
      <h1 style={{ textAlign: "center" }}>item pages</h1>
      <FilterBar context={FilterBarState} />
      <hr />
      <List context={FilterBarState} />
      <CreateDialog />
    </FilterBarState.Provider>
  );
}
