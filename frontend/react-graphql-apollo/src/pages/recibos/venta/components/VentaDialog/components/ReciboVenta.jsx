import { useState, createContext, useRef } from "react";
import ClientSelect from "./ClientSelect";
import TableContainer from "./TablaContainer";
import SearchItem from "../../../../../item/components/FilterBar";

import PrintBtn from "./PrintBtn";

import { useSnackbar } from "notistack";

import { useSelector, useDispatch } from "react-redux";
import {
  toggleCredit,
  resetState,
} from "../../../../../../redux/features/reciboSlice";

import { useMutation } from "@apollo/client";
import { PostVenta } from "../../../grapql/mutation";

import { Checkbox, FormControlLabel } from "@material-ui/core";

export const ShouldSubmit = createContext(null);

export default function ReciboVenta({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [postVenta] = useMutation(PostVenta, {
    onCompleted(data) {
      enqueueSnackbar(`recibo añadido`, {
        variant: "success",
      });
      dispatch(resetState({ reciboTipo: "venta" }));
      closeDialog();
    },
    onError(e) {
      enqueueSnackbar("hubo un error en el recibo o servidor", {
        variant: "warning",
      });
    },
  });

  const venta = useSelector((state) => state.recibo.venta);
  const { lineas, credito } = venta;
  const filterState = useState("");
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
        <SearchItem filterState={filterState} recibo={true} />
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
      <PrintBtn
        btnComp={<button>imprimir</button>}
        cliente={shouldSubmit[0].cliente}
      />
      <PrintBtn
        btnComp={
          <button disabled={isClientSelected}>imprimir y guardar</button>
        }
        onBeforePrint={() =>
          postVenta({
            variables: { ...venta },
          })
        }
        cliente={shouldSubmit[0].cliente}
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
