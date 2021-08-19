import { useState, createContext } from "react";
import TableRecibo from "./TablaContainer/VentaTable";
import FilterBar from "../../../../../../components/PagesLayout/components/FilterBar";
import SearchClient from "../../../../../cliente/components/SearchField";
import SearchItem from "../../../../../item/components/SearchField";

import PrintBtn from "./PrintBtn";

import { useSnackbar } from "notistack";

import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../../../../../redux/features/reciboSlice";

import { useMutation } from "@apollo/client";
import { DEVOLUCION_DATA } from "../../../grapql/query";
import { PostDevolucion } from "../../../grapql/mutation";
import { GET_ITEMS } from "../../../../../item/graphql/query";
import { GET_CLIENTES } from "../../../../../cliente/graphql/query";

export const ReciboState = createContext(null);

export default function ReciboDevolucion({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [postDevolucion] = useMutation(PostDevolucion, {
    update(cache, { data: { postDevolucion } }) {
      cache.modify({
        fields: {
          items(existingData = []) {
            const newItemRef = cache.writeFragment({
              data: postDevolucion,
              fragment: DEVOLUCION_DATA,
            });
            return [...existingData.query, newItemRef];
          },
        },
      });
    },
    onCompleted(data) {
      enqueueSnackbar(`recibo devolucion añadido`, {
        variant: "success",
      });
      dispatch(resetState({ reciboTipo: "devolucion" }));
      closeDialog();
    },
    onError(e) {
      enqueueSnackbar(e.message, {
        variant: "warning",
      });
    },
  });

  const devolucion = useSelector((state) => state.recibo.devolucion);
  const { lineas } = devolucion;
  const filterState = useState("");
  const shouldSubmit = useState({
    cliente: {
      id: null,
      nombre: "",
      telefono: "",
      error: false,
      selected: false,
    },
  });
  const {
    cliente: { selected },
  } = shouldSubmit[0];

  const hasItems = lineas.length === 0;

  const reciboState = {
    shouldSubmit,
    filterState,
  };

  return (
    <>
      <ReciboState.Provider value={reciboState}>
        <FilterBar
          context={ReciboState}
          recibo={true}
          SearchField={SearchClient}
          getQuery={GET_CLIENTES}
          queryType="clientes"
        />
        <FilterBar
          context={ReciboState}
          recibo={true}
          SearchField={SearchItem}
          getQuery={GET_ITEMS}
          queryType="items"
        />
        {/* <SearchItem context={ShouldSubmit} recibo={true} /> */}
        <TableRecibo devolucion={devolucion} />
      </ReciboState.Provider>

      <PrintBtn
        btnComp={<button>imprimir</button>}
        cliente={shouldSubmit[0].cliente}
      />
      <PrintBtn
        btnComp={<button disabled={!selected}>imprimir y guardar</button>}
        onBeforePrint={() =>
          postDevolucion({
            variables: { ...devolucion },
          })
        }
        cliente={shouldSubmit[0].cliente}
      />
      <button
        disabled={!selected}
        onClick={() =>
          postDevolucion({
            variables: { ...devolucion },
          })
        }
      >
        guardar
      </button>
      {!selected && <span>por favor selecciona el cliente</span>}
      {hasItems && <span>por favor agrega un item</span>}
    </>
  );
}
