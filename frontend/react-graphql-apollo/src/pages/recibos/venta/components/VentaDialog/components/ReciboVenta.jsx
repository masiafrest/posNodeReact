import { useState, createContext } from "react";
import TableRecibo from "./TablaContainer/VentaTable";
import FilterBar from "../../../../../../components/PagesLayout/components/FilterBar";
import SearchClient from "../../../../../cliente/components/SearchField";
import SearchItem from "../../../../../item/components/AutoCompleteItem";

import SearchOnAutoComplete from "../../../../components/SearchOnAutoComplete";

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

import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";

export const ReciboState = createContext(null);

export default function ReciboVenta({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [postVenta] = useMutation(PostVenta, {
    update(cache, { data: { postVenta } }) {
      cache.modify({
        fields: {
          ventas(existingDatas = []) {
            const newItemRef = cache.writeFragment({
              data: postVenta,
              fragment: VENTA_DATA,
            });
            return [...existingDatas.query, newItemRef];
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
      console.log(e.message);
      enqueueSnackbar(e.message, {
        variant: "warning",
      });
    },
  });

  const venta = useSelector((state) => state.recibo.venta);
  const { lineas, credito, cliente } = venta;

  const isPriceError = lineas.some((item) => item.precio < item.precioMin);

  const hasItems = lineas.length > 0;

  const canSubmit = !Boolean(cliente && hasItems && !isPriceError);
  console.log(
    "canSubmit: ",
    lineas.length,
    cliente,
    hasItems,
    !isPriceError,
    canSubmit
  );

  const handleCreditoCheckBox = () => dispatch(toggleCredit());
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <SearchOnAutoComplete queryName="clientes" getQuery={GET_CLIENTES} />
      </Grid>
      <Grid item xs={12}>
        <SearchOnAutoComplete queryName="items" getQuery={GET_ITEMS} />
      </Grid>
      <Grid container item>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox checked={credito} onChange={handleCreditoCheckBox} />
            }
            label="Credito"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox checked={!credito} onChange={handleCreditoCheckBox} />
            }
            label="Contado"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableRecibo venta={venta} />
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs="auto">
          <PrintBtn btnComp={<button>imprimir</button>} cliente={cliente} />
        </Grid>
        <Grid item xs="auto">
          <PrintBtn
            btnComp={<button disabled={canSubmit}>imprimir y guardar</button>}
            onBeforePrint={() =>
              postVenta({
                variables: { ...venta },
              })
            }
            cliente={cliente}
          />
        </Grid>
        <Grid item xs="auto">
          <button
            disabled={canSubmit}
            onClick={() =>
              postVenta({
                variables: { ...venta },
              })
            }
          >
            guardar
          </button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {!cliente && <span>por favor selecciona el cliente</span>}
      </Grid>
      <Grid item xs={12}>
        {!hasItems && <span>por favor agrega un item</span>}
      </Grid>
      <Grid item xs={12}>
        {isPriceError && <span>error precio</span>}
      </Grid>
    </Grid>
  );
}
