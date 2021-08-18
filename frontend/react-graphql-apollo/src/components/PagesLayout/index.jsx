import { useState, createContext } from "react";
import { useQuery } from "@apollo/client";

import FilterBar from "./components/FilterBar";
import List from "./components/List";
import Pagination from "@material-ui/lab/Pagination";

const FilterBarState = createContext(null);

export default function PagesLayout({
  title,
  SearchField,
  getQuery,
  CreateDialog,
  viewComp
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

  const [filter, setFilter] = filterState
  const [page, setPage] = pageState
  const [take, setTake] = takeState;
  const [view, setView] = viewState

  const skip = page === 1 ? 0 : (page - 1) * take;
  const { data, loading, error } = useQuery(getQuery, {
    variables: { filter, take, skip },
  });

  const dataRes = loading ? {} : data[title]
  const pages = loading ? 1 : Math.ceil(dataRes.count / take);
  return (
    <FilterBarState.Provider value={filterBarState}>
      <h1 style={{ textAlign: "center" }}>{title.toUpperCase()}</h1>
      <FilterBar context={FilterBarState}
        SearchField={SearchField}
        getQuery={getQuery}
        queryType={title}
      />
      <hr />
      {loading ?
        <span> loading</span>
        :
        dataRes?.query?.length > 0 ?
          <>
            <List
              view={view}
              data={loading ? [] : dataRes.query}
              viewComp={viewComp}
            />
            <Pagination
              count={pages}
              page={page}
              onChange={(e, p) => {
                setPage(p);
              }}
            />
          </>
          : <span>no hay item</span>
      }
      <CreateDialog />
    </FilterBarState.Provider>
  );
}
