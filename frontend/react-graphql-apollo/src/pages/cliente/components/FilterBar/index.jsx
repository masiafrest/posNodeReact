import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTES } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";

export default function FilterBar({ context }) {
  const {
    pageState: [page, setPage],
    filterState: [filter, setFilter],
    takeState: [take, setTake],
    // viewState: [view, setView],
  } = useContext(context);

  const { data, loading } = useQuery(GET_CLIENTES, {
    variables: {
      filter,
      take,
      skip: 0,
    },
  });

  const setSearchTermDebounced = debounce(setFilter, 500);

  return (
    <>
      <SearchField
        loading={loading}
        data={data?.clientes.query}
        initialTerm={filter}
        updateSearchTerm={setSearchTermDebounced}
      />
    </>
  );
}
