import { useState, createContext } from "react";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";
import FilterBar from "./components/FilterBar";

export const FilterBarState = createContext(null)

export default function Item() {
  const filterState = useState("");
  const takeState = useState(5);
  const viewState = useState(false);
  const pageState = useState(1)

  const filterBarState = {
    filterState, takeState, viewState, pageState
  }

  return (
    <FilterBarState.Provider value={filterBarState}>
      <h1 style={{ textAlign: "center" }}>item pages</h1>
      <FilterBar
      />
      <hr />
      {
        //filtro y barra de busqueda
      }
      <ItemList
      />
      <CreateItemDialog />
    </FilterBarState.Provider >
  );
}
