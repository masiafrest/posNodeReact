import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";

export default function FilterBar({ setTake, setFilter, filter, recibo = false }) {
  //query to get suggestions
  const { data, loading } = useQuery(GET_ITEMS, {
    variables: {
      filter,
      skip: 0,
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
    </>
  );
}
