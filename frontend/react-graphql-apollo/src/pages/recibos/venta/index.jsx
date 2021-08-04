import { useState, createContext, useRef } from "react";
import ClientSelect from "./components/ClientSelect";
import TableContainer from "./components/TablaContainer";
import SearchItem from "../../item/components/FilterBar";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./components/ComponentToPrint";
import { useSelector } from "react-redux";
// import { useSnackbar } from "notistack";

export const ShouldSubmit = createContext(null);

export default function Venta() {
  const componentRef = useRef();
  const { subTotal, tax, total, lineas } = useSelector(
    (state) => state.recibo.venta
  );
  const [filter, setFilter] = useState("");
  const shouldSubmit = useState({
    cliente: { error: false, selected: false },
    itemErrors: {}
  });
  return (
    <>
      <ShouldSubmit.Provider value={shouldSubmit}>
        <ClientSelect />
        <SearchItem filter={filter} setFilter={setFilter} recibo={true} />
        <TableContainer />
      </ShouldSubmit.Provider>
      <ReactToPrint
        trigger={() => <button>imprimir</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint
        ref={componentRef}
        lineas={lineas}
        client={shouldSubmit[0].cliente}
        subTotal={subTotal}
        tax={tax}
        total={total}
      />
      {Object.values(shouldSubmit[0].itemErrors).includes(true) && <span>si hay error</span>}
      <button onClick={() => { }}>guardar</button>
    </>
  );
}
