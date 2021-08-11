import SearchField from "./SearchField";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTES } from "../../../../../../cliente/graphql/query";
import debounce from "lodash/debounce";
// import { useSelector, useDispatch } from "react-redux";

export default function ClientSelect() {
  const [searchTerm, setSearchTerm] = useState("");
  //query to get suggestions
  const { data, loading } = useQuery(GET_CLIENTES, {
    variables: {
      filter: searchTerm && "",
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
        updateSearchTerm={setSearchTermDebounced}
      />
    </>
  );
}
