import { createContext, useReducer } from "react";
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
  const initialState = {
    filter: "",
    take: 20,
    view: false,
    page: 1,
    lte: undefined,
    isCredito: true,
    categoria: "TODOS",
  };

  const barReducer = (state, action) => {
    switch (action.type) {
      case "searchOnSubmit":
        return {
          ...state,
          filter: action.payload.filter,
          page: action.payload.page,
        };
      case "selectItemPerPage":
        return {
          ...state,
          take: action.payload.take,
          page: action.payload.page,
        };
      case "filter":
        return { ...state, filter: action.payload };
      case "take":
        return { ...state, take: action.payload };
      case "view":
        return { ...state, view: action.payload };
      case "page":
        return { ...state, page: action.payload };
      case "lte":
        return { ...state, lte: action.payload };
      case "isCredito":
        return { ...state, isCredito: action.payload };
      case "categoria":
        return { ...state, categoria: action.payload };
      default:
        return state;
    }
  };

  const [barState, dispatch] = useReducer(barReducer, initialState);

  const { page, take, view } = barState;

  const skip = page === 1 ? 0 : (page - 1) * take;
  // const variables = { filter, take, skip };

  // title === "items" && (variables.lte = lte);
  // title === "items" && (variables.categoria = categoria);
  // title === "ventas" && (variables.isCredito = isCredito);

  const { data, loading, error } = useQuery(getQuery, {
    variables: { ...barState, skip },
    pollInterval: 30000,
  });

  if (error) {
    console.log("error", error);
    return <div>error</div>;
  }

  const dataRes = loading ? {} : data[title];
  const hasData = loading ? false : data[title].query?.length > 0;
  const pages = loading ? 1 : Math.ceil(dataRes.count / take);

  const CustomPagination = () => (
    <Pagination
      size="medium"
      count={pages}
      page={page}
      siblingCount={0}
      boundaryCount={3}
      onChange={(e, p) => {
        dispatch({ type: "page", payload: p });
      }}
      // hideNextButton
      // hidePrevButton
    />
  );
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
      // style={{ textAlign: 'center' }}
    >
      <FilterBarState.Provider
        value={{
          barState,
          dispatch,
        }}
      >
        <Grid item xs={12}>
          <h1>{title.toUpperCase()}</h1>
        </Grid>
        <Grid item xs={12}>
          <FilterBar
            context={FilterBarState}
            SearchField={SearchField}
            // getQuery={getQuery}
            queryType={title}
            // hasViews={viewComp.Accordion ? true : false}
          />
        </Grid>
        <Grid item xs={12}>
          <CreateDialog />
        </Grid>

        {loading ? (
          <span> loading</span>
        ) : hasData ? (
          <>
            <Grid item xs={12}>
              <CustomPagination />
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <List
                view={view}
                data={loading ? [] : dataRes.query}
                viewComp={viewComp}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomPagination />
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
