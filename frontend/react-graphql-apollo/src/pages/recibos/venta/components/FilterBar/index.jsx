import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_VENTAS } from "../../grapql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";
import { NativeSelect, Typography, Switch, Grid } from "@material-ui/core";

import CardViewIcon from "@material-ui/icons/ViewModule";
import PaperViewIcon from "@material-ui/icons/Dehaze";

export default function FilterBar({ context, recibo = false }) {
  const {
    pageState: [page, setPage],
    filterState: [filter, setFilter],
    takeState: [take, setTake],
    viewState: [view, setView],
  } = useContext(context);
  // let take, setTake, view, setView;
  // if (!recibo) {
  //   [take, setTake] = takeState;
  //   [view, setView] = viewState;
  // }
  //TODO maybe change searchbar without autocomplete en recibos ventas
  //query to get suggestions
  const { data, loading } = useQuery(GET_VENTAS, {
    variables: {
      filter,
      skip: 0,
      take,
    },
  });

  console.log("filter bar, venta, data:", data);
  const setSearchTermDebounced = debounce(setFilter, 500);

  return (
    <>
      <SearchField
        loading={loading}
        data={data?.ventas?.ventas || []} // search suggestions returned
        initialTerm={filter}
        updateSearchTerm={setSearchTermDebounced}
        recibo={recibo}
      />
      {!recibo && (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography>recibos por pagina</Typography>
            <NativeSelect
              value={take}
              onChange={(e) => {
                setTake(e.target.value * 1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </NativeSelect>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <PaperViewIcon />
                </Grid>
                <Grid item>
                  <Switch
                    checked={view}
                    onChange={() => setView(!view)}
                    name="viewSwitch"
                  />
                </Grid>
                <Grid item>
                  <CardViewIcon />
                </Grid>
              </Grid>
            </Typography>
          </div>
        </>
      )}
    </>
  );
}
