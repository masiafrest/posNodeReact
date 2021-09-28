import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import debounce from "lodash/debounce";

import { Grid } from "@material-ui/core";

import SwitchView from "./SwitchView";
import SelectItemPerPage from "./SelectItemPerPage";
import SearchBar from "./SearchBar";
import LteFilter from "./LteFilter";
import IsPagadoCheck from "./IsPagadoCheck";

export default function FilterBar({
  context,
  recibo = false,
  SearchField,
  getQuery,
  queryType,
  hasViews = true,
}) {
  const Context = useContext(context);
  let page, setPage, setTake, view, setView, lteState, isCreditoState;
  let take = 5;
  console.log("query type:", queryType);
  console.log("isRecibo:", recibo);

  if (!recibo) {
    ({
      pageState: [page, setPage],
      takeState: [take, setTake],
      viewState: [view, setView],
      lteState,
      isCreditoState,
    } = Context);
  }

  const {
    filterState: [filter, setFilter],
  } = Context;

  //query to get suggestions for autocomplte on searchbar recibo
  const { data, loading } = useQuery(getQuery, {
    variables: {
      filter,
      skip: 0,
      take,
    },
  });

  const setSearchTermDebounced = debounce(setFilter, 500);
  console.log("filterbar, recibo:", recibo, "hasViews:", hasViews);
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
        {recibo ? (
          <SearchField
            data={loading ? [] : data[queryType]?.query}
            loading={loading}
            initialTerm={filter}
            updateSearchTerm={recibo ? setSearchTermDebounced : setFilter}
            recibo={recibo}
            context={context}
          />
        ) : (
          <SearchBar />
        )}
      </Grid>
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
