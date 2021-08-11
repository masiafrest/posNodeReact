import { useState } from "react";
import VentaDialog from "./components/VentaDialog";
// import VentaList from "./components/VentaList";
import FilterBar from "./components/FilterBar/index.jsx";

export default function Venta() {
  const filterState = useState("");
  const takeState = useState(5);
  const viewState = useState(false);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>venta pages</h1>
      <FilterBar
        takeState={takeState}
        filterState={filterState}
        viewState={viewState}
      />
      <hr />
      {
        //filtro y barra de busqueda
      }
      {/* <VentaList
        filter={filterState[0]}
        take={takeState[0]}
        view={viewState[0]}
      /> */}
      <VentaDialog />
    </>
  );
}
