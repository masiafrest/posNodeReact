import SearchField from "./SearchField";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../grapql/query";
import debounce from "lodash/debounce";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  //query to get suggestions
  const { data, loading } = useQuery(GET_CLIENTS);

  const setSearchTermDebounced = debounce(setSearchTerm, 500);

  return (
    <>
      <SearchField
        loading={loading}
        data={data} // search suggestions returned
        initialTerm={searchTerm}
        updateSearchTerm={setSearchTermDebounced}
      />
    </>
  );
}
