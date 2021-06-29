import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";

export default function FilterBar() {
  const [searchTerm, setSearchTerm] = useState("");

  //query to get suggestions
  const { data, loading } = useQuery(GET_ITEMS, {
    variables: {
      filter: searchTerm,
      skip: 0,
    },
  });

  const setSearchTermDebounced = debounce(setSearchTerm, 500);

  return (
    <>
      <SearchField
        loading={loading}
        data={data} // search suggestions returned
        initialTerm={searchTerm}
        updateSearchTerm={setSearchTerm}
      />
    </>
  );
}
