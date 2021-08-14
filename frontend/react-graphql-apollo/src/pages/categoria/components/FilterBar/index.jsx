import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIAS } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";

export default function FilterBar({ context }) {
  const {
    pageState: [page, setPage],
    filterState: [filter, setFilter],
    takeState: [take, setTake],
    viewState: [view, setView],
  } = useContext(context);

  //query to get suggestions
  const { data, loading } = useQuery(GET_CATEGORIAS, {
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
        data={data?.categorias || []} // search suggestions returned
        // data={data?.query.categorias || []} // search suggestions returned
        initialTerm={filter}
        updateSearchTerm={setSearchTermDebounced}
      />
    </>
  );
}
