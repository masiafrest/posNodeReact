import { useState, createContext, useRef } from "react";
import ClientSelect from "./components/ClientSelect";
import TableContainer from "./components/TablaContainer";
import SearchItem from "../../item/components/FilterBar";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./components/ComponentToPrint";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
// import { useSnackbar } from "notistack";

export const Client = createContext(null);

export default function Venta() {
  const componentRef = useRef();
  const { subTotal, tax, total, lineas } = useSelector(
    (state) => state.recibo.venta
  );
  const [filter, setFilter] = useState("");
  const client = useState({
    error: true,
    nombre: "",
    dirrecion: "",
    telefono: "",
  });
  console.log(client);
  return (
    <>
      <Client.Provider value={client}>
        <ClientSelect />
        <SearchItem filter={filter} setFilter={setFilter} />
        <TableContainer />
      </Client.Provider>
      <ReactToPrint
        trigger={() => <button>imprimir</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint
        ref={componentRef}
        lineas={lineas}
        client={client[0]}
        subTotal={subTotal}
        tax={tax}
        total={total}
      />
      <button onClick={() => {}}>guardar</button>
    </>
  );
}
