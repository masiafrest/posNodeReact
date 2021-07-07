import { useState } from "react";
import ClienteList from "./components/ClienteList";
import CreateClienteDialog from "./components/ClienteDialog";
import FilterBar from "./components/FilterBar";

export default function Cliente() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <h1 style={{ textAlign: "center" }}>clientes pages</h1>
      <FilterBar />
      <hr />
      {
        //filtro y barra de busqueda
      }
      <ClienteList filter={filter} />
      <CreateClienteDialog />
    </>
  );
}
