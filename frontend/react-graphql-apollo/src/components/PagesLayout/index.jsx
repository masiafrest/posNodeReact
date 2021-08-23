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
  const hasData = loading ? {} : data[title].query?.length > 0;
  const pages = loading ? 1 : Math.ceil(dataRes.count / take);

  return (
    <FilterBarState.Provider value={filterBarState}>
      <h1 style={{ textAlign: "center" }}>{title.toUpperCase()}</h1>
      {hasData && (
        <FilterBar
          context={FilterBarState}
          SearchField={SearchField}
          getQuery={getQuery}
          queryType={title}
          hasViews={viewComp.Accordion ? true : false}
        />
      )}
      <hr />
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={3}
        // style={{ textAlign: 'center' }}
      >
        {loading ? (
          <span> loading</span>
        ) : hasData ? (
          <>
            <Grid
              container
              item
              sm={12}
              alignItems="center"
              // justify='center'
              spacing={2}
            >
              <List
                view={view}
                data={loading ? [] : dataRes.query}
                viewComp={viewComp}
              />
            </Grid>
            <Grid item>
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
          <Grid item>
            <span>no hay item</span>
          </Grid>
        )}
      </Grid>
      <CreateDialog />
    </FilterBarState.Provider>
  );
}
