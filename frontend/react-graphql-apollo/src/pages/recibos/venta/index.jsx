import { useState, createContext } from "react";
import ClientSelect from "./components/ClientSelect";
import TableContainer from "./components/TablaContainer";
import SearchItem from "../../item/components/FilterBar";
// import { useSelector } from "react-redux";
// import { useSnackbar } from "notistack";
// import ReactToPrint from "react-to-print";
// import ComponentToPrint from "../../components/ComponentToPrint";

export const IsError = createContext(null);

export default function Venta() {
  const [filter, setFilter] = useState("");
  const isError = useState({ cliente: true });

  return (
    <>
      <IsError.Provider value={isError}>
        <ClientSelect />
        <SearchItem filter={filter} setFilter={setFilter} />
        <TableContainer />
      </IsError.Provider>
    </>
  );
}
