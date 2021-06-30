import { useState } from "react";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";
import FilterBar from "./components/FilterBar";

export default function Item() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <h1 style={{ textAlign: "center" }}>item pages</h1>
      <FilterBar />
      <hr />
      {
        //filtro y barra de busqueda
      }
      <ItemList filter={filter} />
      <CreateItemDialog />
    </>
  );
}
