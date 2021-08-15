import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTES } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";

export default function FilterBar({ context, recibo = false }) {
  const Context = useContext(context);
  let page, setPage, take, setTake, view, setView;

  if (!recibo) {
    ({
      pageState: [page, setPage],
      takeState: [take, setTake],
      viewState: [view, setView],
    } = Context);
  }

  const {
    filterState: [filter, setFilter],
  } = Context;

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
        data={data?.clientes.query || []}
        initialTerm={filter}
        updateSearchTerm={setSearchTermDebounced}
        recibo={recibo}
        context={Context.shouldSubmit}
      />
    </>
  );
}
