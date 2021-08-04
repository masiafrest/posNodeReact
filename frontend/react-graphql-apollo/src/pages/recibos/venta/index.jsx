import { useState, createContext, useRef } from "react";
import ClientSelect from "./components/ClientSelect";
import TableContainer from "./components/TablaContainer";
import SearchItem from "../../item/components/FilterBar";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./components/ComponentToPrint";
import { useSelector } from "react-redux";
import { useMutation, gql } from "@apollo/client";
// import { useSnackbar } from "notistack";

export const ShouldSubmit = createContext(null);

export default function Venta() {
  const [postVenta, {}] = useMutation(gql`
    mutation PostVenta(
      $clienteId: Int
      $credito: Boolean
      $subTotal: Float
      $tax: Float
      $total: Float
      $lineas: [VentaLineaInput]
    ) {
      postVenta(
        clienteId: $clienteId
        credito: $credito
        lineas: $lineas
        subTotal: $subTotal
        tax: $tax
        total: $total
      ) {
        id
        lineas {
          item {
            id
            marca
          }
          id
          descripcion
        }
      }
    }
  `);
  const componentRef = useRef();
  const venta = useSelector((state) => state.recibo.venta);
  const { subTotal, tax, total, lineas } = venta;
  const [filter, setFilter] = useState("");
  const shouldSubmit = useState({
    cliente: {
      id: null,
      nombre: "",
      telefono: "",
      error: false,
      selected: false,
    },
    itemErrors: {},
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
      {(Object.values(shouldSubmit[0].itemErrors).includes(true) ||
        !shouldSubmit[0].cliente.selected) && <span>si hay error</span>}
      <button onClick={() => postVenta({ variables: { ...venta } })}>
        guardar
      </button>
    </>
  );
}
