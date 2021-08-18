import { useState, createContext } from "react";
import TableRecibo from './TablaContainer/VentaTable'
import FilterBar from "../../../../../../components/PagesLayout/components/FilterBar";
import SearchClient from '../../../../../cliente/components/SearchField'
import SearchItem from "../../../../../item/components/SearchField";

import PrintBtn from "./PrintBtn";

import { useSnackbar } from "notistack";

import { useSelector, useDispatch } from "react-redux";
import {
  toggleCredit,
  resetState,
} from "../../../../../../redux/features/reciboSlice";

import { useMutation } from "@apollo/client";
import { VENTA_DATA } from "../../../grapql/query";
import { PostVenta } from "../../../grapql/mutation";
import { GET_ITEMS } from "../../../../../item/graphql/query";
import { GET_CLIENTES } from "../../../../../cliente/graphql/query";

import { Checkbox, FormControlLabel } from "@material-ui/core";

export const ReciboState = createContext(null);

export default function ReciboVenta({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [postVenta] = useMutation(PostVenta, {
    update(cache, { data: { postVenta } }) {
      cache.modify({
        fields: {
          items(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: postVenta,
              fragment: VENTA_DATA,
            });
            return [...existingItems.query, newItemRef];
          },
        },
      });
    },
    onCompleted(data) {
      enqueueSnackbar(`recibo añadido`, {
        variant: "success",
      });
      dispatch(resetState({ reciboTipo: "venta" }));
      closeDialog();
    },
    onError(e) {
      enqueueSnackbar(e.message, {
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
    isPriceError: false
  });
  const { cliente: { selected }, isPriceError } = shouldSubmit[0];
  const hasItems = lineas.length === 0;

  const reciboState = {
    shouldSubmit,
    filterState
  }
  const handleCreditoCheckBox = () => dispatch(toggleCredit());
  return (
    <>
      <ReciboState.Provider value={reciboState}>
        <FilterBar
          context={ReciboState}
          recibo={true}
          SearchField={SearchClient}
          getQuery={GET_CLIENTES}
          queryType='clientes'
        />
        <FilterBar
          context={ReciboState}
          recibo={true}
          SearchField={SearchItem}
          getQuery={GET_ITEMS}
          queryType='items'
        />
        {/* <SearchItem context={ShouldSubmit} recibo={true} /> */}
        <TableRecibo venta={venta} />
      </ReciboState.Provider>

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
          <button disabled={!selected || isPriceError}>imprimir y guardar</button>
        }
        onBeforePrint={() =>
          postVenta({
            variables: { ...venta },
          })
        }
        cliente={shouldSubmit[0].cliente}
      />
      <button
        disabled={!selected || isPriceError}
        onClick={() =>
          postVenta({
            variables: { ...venta },
          })
        }
      >
        guardar
      </button>
      {!selected && <span>por favor selecciona el cliente</span>}
      {hasItems && <span>por favor agrega un item</span>}
      {isPriceError && <span>error precio</span>}
    </>
  );
}
