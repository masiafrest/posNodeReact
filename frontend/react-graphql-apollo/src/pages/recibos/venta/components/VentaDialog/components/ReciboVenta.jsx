import { useState, createContext } from "react";
import TableRecibo from "./TablaContainer/VentaTable";
import FilterBar from "../../../../../../components/PagesLayout/components/FilterBar";
import SearchClient from "../../../../../cliente/components/SearchField";
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
  const { lineas, credito } = venta;
  const filterState = useState("");
  const takeState = useState(5);
  const shouldSubmit = useState({
    cliente: {
      id: null,
      nombre: "",
      telefono: "",
      error: false,
      selected: false,
    },
    isPriceError: false,
  });
  const {
    cliente: { selected },
    isPriceError,
  } = shouldSubmit[0];
  const hasItems = lineas.length === 0;

  const reciboState = {
    shouldSubmit,
    filterState,
    takeState,
  };
  const handleCreditoCheckBox = () => dispatch(toggleCredit());
  return (
    <Grid container spacing={1}>
      <ReciboState.Provider value={reciboState}>
        <Grid item xs={12}>
          <FilterBar
            context={ReciboState}
            recibo={true}
            SearchField={SearchClient}
            getQuery={GET_CLIENTES}
            queryType="clientes"
          />
        </Grid>
        <Grid item xs={12}>
          <FilterBar
            context={ReciboState}
            recibo={true}
            SearchField={SearchItem}
            getQuery={GET_ITEMS}
            queryType="items"
          />
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
      </ReciboState.Provider>
      <Grid container item spacing={2}>
        <Grid item xs="auto">
          <PrintBtn
            btnComp={<button>imprimir</button>}
            cliente={shouldSubmit[0].cliente}
          />
        </Grid>
        <Grid item xs="auto">
          <PrintBtn
            btnComp={
              <button disabled={!selected || isPriceError}>
                imprimir y guardar
              </button>
            }
            onBeforePrint={() =>
              postVenta({
                variables: { ...venta },
              })
            }
            cliente={shouldSubmit[0].cliente}
          />
        </Grid>
        <Grid item xs="auto">
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {!selected && <span>por favor selecciona el cliente</span>}
      </Grid>
      <Grid item xs={12}>
        {hasItems && <span>por favor agrega un item</span>}
      </Grid>
      <Grid item xs={12}>
        {isPriceError && <span>error precio</span>}
      </Grid>
    </Grid>
  );
}
