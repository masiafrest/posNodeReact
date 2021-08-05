import { useState, createContext, useRef } from "react";
import ClientSelect from "./components/ClientSelect";
import TableContainer from "./components/TablaContainer";
import SearchItem from "../../item/components/FilterBar";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./components/ComponentToPrint";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { PostVenta } from "./grapql/mutation";
import { useSnackbar } from "notistack";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export const ShouldSubmit = createContext(null);

export default function Venta() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [postVenta] = useMutation(PostVenta, {
    onCompleted(data) {
      enqueueSnackbar(`recibo añadido`, {
        variant: "success",
      });
    },
    onError(e) {
      enqueueSnackbar("hubo un error en el recibo o servidor", {
        variant: "warning",
      });
    },
  });

  const componentRef = useRef();
  const venta = useSelector((state) => state.recibo.venta);
  const { subTotal, tax, total, lineas, credito } = venta;
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
  const hasError =
    Object.values(shouldSubmit[0].itemErrors).includes(true) ||
    !shouldSubmit[0].cliente.selected ||
    lineas.length === 0;
  return (
    <>
      <ShouldSubmit.Provider value={shouldSubmit}>
        <ClientSelect />
        <SearchItem filter={filter} setFilter={setFilter} recibo={true} />
        <TableContainer />
      </ShouldSubmit.Provider>
      <FormControlLabel
        control={<Checkbox checked={credito} onChange={() => dispatch()} />}
        label="Credito"
      />
      <FormControlLabel
        control={<Checkbox checked={!credito} />}
        label="Contado"
      />
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
      {hasError && <span>si hay error</span>}
      <button
        disabled={hasError}
        onClick={() =>
          postVenta({
            variables: { ...venta },
          })
        }
      >
        guardar
      </button>
    </>
  );
}
