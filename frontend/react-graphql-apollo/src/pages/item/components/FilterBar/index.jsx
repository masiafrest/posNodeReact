import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";
import { NativeSelect, Typography, Switch, Grid } from "@material-ui/core";

import CardViewIcon from "@material-ui/icons/ViewModule";
import PaperViewIcon from "@material-ui/icons/Dehaze";

export default function FilterBar({
  takeState,
  filterState,
  viewState,
  recibo = false,
}) {
  let take, setTake, view, setView;
  if (!recibo) {
    [take, setTake] = takeState;
    [view, setView] = viewState;
  }

  const [filter, setFilter] = filterState;

  //query to get suggestions
  const { data, loading } = useQuery(GET_ITEMS, {
    variables: {
      filter,
      skip: 0,
      take,
    },
  });

  const setSearchTermDebounced = debounce(setFilter, 500);

  return (
    <>
      <SearchField
        loading={loading}
        data={data} // search suggestions returned
        initialTerm={filter}
        updateSearchTerm={setSearchTermDebounced}
        recibo={recibo}
      />
      {!recibo && (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography>items por pagina</Typography>
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
