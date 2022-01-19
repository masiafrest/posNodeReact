import { useContext } from "react";

import { Grid } from "@material-ui/core";

import SwitchView from "./components/SwitchView";
import SelectItemPerPage from "./components/SelectItemPerPage";
import SearchOnSubmit from "./components/SearchOnSubmit";
import LteFilter from "./components/LteFilter";
import IsPagadoCheck from "./components/IsPagadoCheck";
import CategoriaFilter from "./components/CategoriaFilter";

export default function FilterBar({
  context,
  recibo = false,
  getQuery,
  queryType,
  hasViews = true,
}) {
  const { barState, dispatch } = useContext(context);
  const Context = useContext(context);
  // let page,
  //   setPage,
  //   setTake,
  //   view,
  //   setView,
  //   lteState,
  //   isCreditoState,
  //   categoriaState;

  // let take = 5;

  // if (!recibo) {
  //   ({
  //     pageState: [page, setPage],
  //     takeState: [take, setTake],
  //     viewState: [view, setView],
  //     lteState,
  //     isCreditoState,
  //     categoriaState,
  //   } = Context);
  // }

  // const {
  //   filterState: [filter, setFilter],
  // } = Context;
  const { filter, take, view, page, lte, isCredito, categoria } = barState;
  return (
    <Grid
      container
      item
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
      // style={{ textAlign: "center" }}
    >
      <Grid item xs={12} md={3}>
        <SearchOnSubmit filterState={[filter, dispatch]} />
      </Grid>
      {queryType === "items" && !recibo && (
        <Grid item xs={3} sm={2}>
          <CategoriaFilter categoriaState={[categoria, dispatch]} />
        </Grid>
      )}
      {!recibo && (
        <>
          <Grid item xs={3} sm={3}>
            <SelectItemPerPage take={take} dispatch={dispatch} />
          </Grid>
          {/* {hasViews && (
            <Grid item xs={3} sm={3}>
              <SwitchView view={view} setView={setView} />
            </Grid>
          )} */}
        </>
      )}
      {queryType === "items" && !recibo && (
        <Grid item xs={3} sm={2}>
          <LteFilter lteState={[lte, dispatch]} />
        </Grid>
      )}
      {queryType === "ventas" && (
        <Grid item xs={2} sm={2}>
          <IsPagadoCheck isCreditoState={[isCredito, dispatch]} />
        </Grid>
      )}
    </Grid>
  );
}
