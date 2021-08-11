import { useState } from "react";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";
import FilterBar from "./components/FilterBar";

export default function Item() {
  const filterState = useState("");
  const takeState = useState(5);
  const viewState = useState(false);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>item pages</h1>
      <FilterBar takeState={takeState}
        filterState={filterState}
        viewState={viewState}
      />
      <hr />
      {
        //filtro y barra de busqueda
      }
      <ItemList filter={filterState[0]} take={takeState[0]} view={viewState[0]} />
      <CreateItemDialog />
    </>
  );
}
