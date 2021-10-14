import { useContext } from "react";
import { useQuery } from "@apollo/client";
import debounce from "lodash/debounce";

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
  const Context = useContext(context);
  let page,
    setPage,
    setTake,
    view,
    setView,
    lteState,
    isCreditoState,
    categoriaState;

  let take = 5;

  if (!recibo) {
    ({
      pageState: [page, setPage],
      takeState: [take, setTake],
      viewState: [view, setView],
      lteState,
      isCreditoState,
      categoriaState,
    } = Context);
  }

  const {
    filterState: [filter, setFilter],
  } = Context;

  return (
    <Grid
      container
      item
      spacing={1}
      justifyContent="center"
      alignItems="center"
      // style={{ textAlign: "center" }}
    >
      <Grid
        item
        xs={recibo ? 12 : hasViews ? 6 : 9}
        sm={recibo ? 12 : hasViews ? 6 : 9}
      >
        <SearchOnSubmit filterState={[filter, setFilter]} setPage={setPage} />
      </Grid>
      {queryType === "items" && !recibo && (
        <Grid item xs={6} sm={3}>
          <CategoriaFilter categoriaState={categoriaState} />
        </Grid>
      )}
      {!recibo && (
        <>
          <Grid item xs={hasViews ? 6 : 3} sm={3}>
            <SelectItemPerPage
              take={take}
              setTake={setTake}
              setPage={setPage}
            />
          </Grid>
          {hasViews && (
            <Grid item xs={6} sm={3}>
              <SwitchView view={view} setView={setView} />
            </Grid>
          )}
        </>
      )}
      {queryType === "items" && !recibo && (
        <Grid item xs={6} sm={3}>
          <LteFilter lteState={lteState} />
        </Grid>
      )}
      {queryType === "ventas" && (
        <IsPagadoCheck isCreditoState={isCreditoState} />
      )}
    </Grid>
  );
}
