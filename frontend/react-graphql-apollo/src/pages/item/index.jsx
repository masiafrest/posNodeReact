import { useState } from "react";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";
import FilterBar from "./components/FilterBar";

export default function Item() {
  const [filter, setFilter] = useState("");
  const [take, setTake] = useState(5);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>item pages</h1>
      <FilterBar take={take} setTake={setTake} setFilter={setFilter} filter={filter} />
      <hr />
      {
        //filtro y barra de busqueda
      }
      <ItemList filter={filter} take={take} />
      <CreateItemDialog />
    </>
  );
}
