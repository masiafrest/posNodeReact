import { useState } from "react";
import CategoriaList from "./components/CategoriaList";
import CreateCategoriaDialog from "./components/CategoriaDialog";
import FilterBar from "./components/FilterBar";

export default function Categoria() {
  const [filter, setFilter] = useState("");
  const [perPage, setPerPage] = useState(10);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>categoria pages</h1>
      <FilterBar />
      <hr />
      {
        //filtro y barra de busqueda
      }
      <CategoriaList filter={filter} perPage={perPage} />
      <CreateCategoriaDialog />
    </>
  );
}
