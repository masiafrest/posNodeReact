import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import SearchField from "./SearchField";
import debounce from "lodash/debounce";
import { NativeSelect, Typography } from '@material-ui/core'

export default function FilterBar({ take, setTake, setFilter, filter, recibo = false }) {
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography>items por pagina</Typography>
        <NativeSelect value={take} onChange={e => {
          setTake(e.target.value * 1)
        }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </NativeSelect>
      </div>
    </>
  );
}
