import SearchField from "./SearchField";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../grapql/query";
import debounce from "lodash/debounce";

export default function ClientSelect() {
  const [searchTerm, setSearchTerm] = useState("");
  console.log("searchTerm", searchTerm);
  //query to get suggestions
  const { data, loading } = useQuery(GET_CLIENTS);
  console.log("data: ", data);
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
