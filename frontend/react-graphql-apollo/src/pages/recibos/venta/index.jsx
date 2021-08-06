import { useState, createContext, useRef } from "react";
import ClientSelect from "./components/ClientSelect";
import TableContainer from "./components/TablaContainer";
import SearchItem from "../../item/components/FilterBar";
import ComponentToPrint from "./components/ComponentToPrint";

import ReactToPrint from "react-to-print";
import { useSnackbar } from "notistack";

import { useSelector, useDispatch } from "react-redux";
import { toggleCredit } from "../../../redux/features/reciboSlice";

import { useMutation } from "@apollo/client";
import { PostVenta } from "./grapql/mutation";

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
  const { cliente } = shouldSubmit[0];
  const isClientSelected = !cliente.selected;
  const hasItems = lineas.length === 0;

  const handleCreditoCheckBox = () => dispatch(toggleCredit());
  return (
    <>
      <ShouldSubmit.Provider value={shouldSubmit}>
        <ClientSelect />
        <SearchItem filter={filter} setFilter={setFilter} recibo={true} />
        <TableContainer />
      </ShouldSubmit.Provider>
      <FormControlLabel
        control={
          <Checkbox checked={credito} onChange={handleCreditoCheckBox} />
        }
        label="Credito"
      />
      <FormControlLabel
        control={
          <Checkbox checked={!credito} onChange={handleCreditoCheckBox} />
        }
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
      <ReactToPrint
        trigger={() => (
          <button disabled={isClientSelected}>imprimir y guardar</button>
        )}
        onBeforePrint={() =>
          postVenta({
            variables: { ...venta },
          })
        }
        content={() => componentRef.current}
      />
      <button
        disabled={isClientSelected}
        onClick={() =>
          postVenta({
            variables: { ...venta },
          })
        }
      >
        guardar
      </button>
      {isClientSelected && <span>por favor selecciona el cliente</span>}
      {hasItems && <span>por favor agrega un item</span>}
    </>
  );
}
