import { useState } from "react";
import { useQuery } from "@apollo/client";
import debounce from "lodash/debounce";

import SearchUi from "./SearchUi";

import { useSelector, useDispatch } from "react-redux";

export default function SearchOnAutoComplete({
  categoriaFilter = "",
  getQuery,
  queryName,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error } = useQuery(getQuery, {
    variables: {
      filter: searchTerm,
      take: 5,
      skip: 0,
      categoria: categoriaFilter,
    },
  });

  const setSearchTermDebounced = debounce(setSearchTerm, 500);

  return (
    <SearchUi
      queryName={queryName}
      loading={loading}
      data={data}
      searchTerm={searchTerm}
      setSearchTermDebounced={setSearchTermDebounced}
    />
  );
}
