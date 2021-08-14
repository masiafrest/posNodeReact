import { useContext } from "react";
import { useQuery } from "@apollo/client";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";

import SelectItemPerPage from "./components/SelectItemPerPage";
import ViewSwitcher from "./components/ViewSwitcher";

export default function FilterBar({
  context,
  filters = false,
  getQuery,
  queryType,
}) {
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
  const { data, loading, error } = useQuery(getQuery, {
    variables: {
      filter,
      skip: 0,
      take,
    },
  });

  const setSearchTermDebounced = debounce(setFilter, 500);

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;

  return (
    <>
      <SearchField
        loading={loading}
        data={data[queryType].query || []} // search suggestions returned
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
