import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import debounce from "lodash/debounce";

import { Grid, TextField } from "@material-ui/core";

import SwitchView from "./SwitchView";
import SelectItemPerPage from "./SelectItemPerPage";
import SearchBar from "./SearchBar";

export default function FilterBar({
  context,
  recibo = false,
  SearchField,
  getQuery,
  queryType,
  hasViews = true,
}) {
  const Context = useContext(context);
  let page, setPage, setTake, view, setView;
  let take = 5;
  console.log("query type:", queryType);

  if (!recibo) {
    ({
      pageState: [page, setPage],
      takeState: [take, setTake],
      viewState: [view, setView],
    } = Context);
  }

  const {
    filterState: [filter, setFilter],
  } = Context;
  // const [lte, setLte] = useState(null);
  // const [gte, setGte] = useState(null);

  //query to get suggestions
  const { data, loading } = useQuery(getQuery, {
    variables: {
      filter,
      skip: 0,
      take,
      // lte,
      // gte,
    },
  });

  const setSearchTermDebounced = debounce(setFilter, 500);

  return (
    <Grid
      container
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      // style={{ textAlign: "center" }}
    >
      <Grid
        item
        xs={recibo ? 12 : hasViews ? 12 : 9}
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
      {/* {queryType === "items" && (
        <>
          <Grid item xs={hasViews ? 6 : 3} sm={3}>
            <TextField>lte</TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField>gte</TextField>
          </Grid>
        </>
      )} */}
    </Grid>
  );
}
