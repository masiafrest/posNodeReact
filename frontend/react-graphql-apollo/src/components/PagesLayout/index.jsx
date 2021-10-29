import { useState, createContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import FilterBar from "./components/FilterBar";
import List from "./components/List";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";

export const FilterBarState = createContext(null);

export default function PagesLayout({
  title,
  SearchField,
  getQuery,
  CreateDialog,
  viewComp,
}) {
  const filterState = useState("");
  const takeState = useState(20);
  const viewState = useState(false);
  const pageState = useState(1);
  const lteState = useState(null);
  const isCreditoState = useState(true);
  const categoriaState = useState("todos");

  const filterBarState = {
    filterState,
    takeState,
    viewState,
    pageState,
    lteState,
    isCreditoState,
    categoriaState,
  };

  const [filter, setFilter] = filterState;
  const [page, setPage] = pageState;
  const [take, setTake] = takeState;
  const [view, setView] = viewState;
  const [lte, setLte] = lteState;
  const [isCredito, setIsCredito] = isCreditoState;
  const [categoria, setCategoria] = categoriaState;

  const skip = page === 1 ? 0 : (page - 1) * take;
  const variables = { filter, take, skip };

  title === "items" && (variables.lte = lte);
  title === "items" && (variables.categoria = categoria);
  title === "ventas" && (variables.isCredito = isCredito);

  const { data, loading, error } = useQuery(getQuery, {
    variables,
  });

  console.log("data", data);
  console.log("error", error);
  const dataRes = loading ? {} : data[title];
  const hasData = loading ? false : data[title].query?.length > 0;
  const pages = loading ? 1 : Math.ceil(dataRes.count / take);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
      // style={{ textAlign: 'center' }}
    >
      <FilterBarState.Provider value={filterBarState}>
        <Grid item xs={12}>
          <h1>{title.toUpperCase()}</h1>
        </Grid>
        <Grid item xs={12}>
          <FilterBar
            context={FilterBarState}
            SearchField={SearchField}
            getQuery={getQuery}
            queryType={title}
            hasViews={viewComp.Accordion ? true : false}
          />
        </Grid>
        <Grid item xs={12}>
          <CreateDialog />
        </Grid>
        {loading ? (
          <span> loading</span>
        ) : hasData ? (
          <>
            <Grid container item sm={12} alignItems="center" spacing={2}>
              <List
                view={view}
                data={loading ? [] : dataRes.query}
                viewComp={viewComp}
              />
            </Grid>
            <Grid item xs={12}>
              <Pagination
                count={pages}
                page={page}
                onChange={(e, p) => {
                  setPage(p);
                }}
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <span>no hay item</span>
          </Grid>
        )}
        <Grid item xs={12}>
          <CreateDialog />
        </Grid>
      </FilterBarState.Provider>
    </Grid>
  );
}
