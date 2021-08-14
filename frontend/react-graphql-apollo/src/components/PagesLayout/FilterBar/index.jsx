import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";

import SelectItemPerPage from "./components/SelectItemPerPage";
import ViewSwitcher from "./components/ViewSwitcher";

export default function FilterBar({ context, filters = false, query = "" }) {
  const Context = useContext(context);
  let page, setPage, take, setTake, view, setView;

  if (!filters) {
    ({
      pageState: [page, setPage],
      takeState: [take, setTake],
      viewState: [view, setView],
    } = Context);
  }

  const {
    filterState: [filter, setFilter],
  } = Context;

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
        data={data?.items?.query || []} // search suggestions returned
        initialTerm={filter}
        updateSearchTerm={setSearchTermDebounced}
        recibo={recibo}
      />
      {!filters && (
        <>
          <SelectItemPerPage setTake={setTake} setPage={setPage} />
          <ViewSwitcher view={view} setView={setView} />
        </>
      )}
    </>
  );
}
