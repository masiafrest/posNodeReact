import { useContext } from "react";

import { Grid } from "@material-ui/core";

// import SwitchView from "./components/SwitchView";
import SelectItemPerPage from "./components/SelectItemPerPage";
import SearchOnSubmit from "./components/SearchOnSubmit";
import LteFilter from "./components/LteFilter";
import IsPagadoCheck from "./components/IsPagadoCheck";
import CategoriaFilter from "./components/CategoriaFilter";

export default function FilterBar({
  context,
  recibo = false,
  // getQuery,
  queryType,
  // hasViews = true,
}) {
  const { barState, dispatch } = useContext(context);
  const { filter, take, lte, isCredito, categoria } = barState;
  return (
    <Grid
      container
      item
      spacing={2}
      justifyContent="center"
      alignItems="center"
      // style={{ textAlign: "center" }}
    >
      <Grid item xs={12}>
        <SearchOnSubmit filterState={[filter, dispatch]} />
      </Grid>
      {queryType === "items" && !recibo && (
        <Grid item xs={4}>
          <CategoriaFilter categoriaState={[categoria, dispatch]} />
        </Grid>
      )}
      {!recibo && (
        <>
          <Grid item xs={queryType === "ventas" ? 6 : 4}>
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
        <Grid item xs={4}>
          <LteFilter lteState={[lte, dispatch]} />
        </Grid>
      )}
      {queryType === "ventas" && (
        <Grid item xs={6} sm={2}>
          <IsPagadoCheck isCreditoState={[isCredito, dispatch]} />
        </Grid>
      )}
    </Grid>
  );
}
