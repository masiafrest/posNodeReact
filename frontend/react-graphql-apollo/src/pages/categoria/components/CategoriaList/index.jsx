import { useContext } from "react";

import { useQuery } from "@apollo/client";
import { GET_CATEGORIAS } from "../../graphql/query";
import CategoriaPaper from "./CategoriaPaper";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export default function CategoriaList({ context }) {
  const {
    pageState: [page, setPage],
    filterState: [filter, setFilter],
    takeState: [take, setTake],
    // viewState: [view, setView],
  } = useContext(context);

  const skip = page === 1 ? 0 : (page - 1) * take;
  const { data, loading, error } = useQuery(GET_CATEGORIAS, {
    variables: {
      filter,
      take,
      skip,
    },
  });

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;

  const pages = Math.ceil(data.categorias.count / take);
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
        {data.categorias.query.map((categoria) => (
          <Grid item key={`categoria-grid-${categoria.id}`}>
            <CategoriaPaper
              categoria={categoria}
              key={`categoria-${categoria.id}`}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
