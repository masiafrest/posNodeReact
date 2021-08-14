import { useContext } from "react";

import { useQuery } from "@apollo/client";
import { GET_CLIENTES } from "../../graphql/query";
import ClientePaper from "./ClientePaper";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export default function ItemList({ context }) {
  const {
    pageState: [page, setPage],
    filterState: [filter, setFilter],
    takeState: [take, setTake],
    // viewState: [view, setView],
  } = useContext(context);

  const skip = page === 1 ? 0 : (page - 1) * take;
  const { data, loading, error } = useQuery(GET_CLIENTES, {
    variables: {
      filter,
      take,
      skip
    },
  });

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;

  const pages = Math.ceil(data.clientes.count / take);
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <>
      <Pagination
        count={pages}
        page={page}
        onChange={(e, p) => {
          setPage(p);
        }}
      />
      <Grid container spacing={1}>
        {data.clientes.query.map((cliente) => (
          <Grid item key={`cliente-grid-${cliente.id}`}>
            <ClientePaper cliente={cliente} key={`cliente-${cliente.id}`} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
