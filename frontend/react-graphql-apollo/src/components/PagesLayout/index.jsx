import { useState, createContext } from "react";
import { useQuery } from "@apollo/client";

import FilterBar from "./components/FilterBar";
import List from "./components/List";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";

const FilterBarState = createContext(null);

export default function PagesLayout({
  title,
  SearchField,
  getQuery,
  CreateDialog,
  viewComp,
}) {
  const filterState = useState("");
  const takeState = useState(5);
  const viewState = useState(false);
  const pageState = useState(1);

  const filterBarState = {
    filterState,
    takeState,
    viewState,
    pageState,
  };

  const [filter, setFilter] = filterState;
  const [page, setPage] = pageState;
  const [take, setTake] = takeState;
  const [view, setView] = viewState;

  const skip = page === 1 ? 0 : (page - 1) * take;
  const { data, loading, error } = useQuery(getQuery, {
    variables: { filter, take, skip },
  });

  console.log("data", data);
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
