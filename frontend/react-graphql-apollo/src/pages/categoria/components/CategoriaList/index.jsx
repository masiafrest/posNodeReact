import { useQuery } from "@apollo/client";
import { GET_CATEGORIAS } from "../../graphql/query";
import CategoriaPaper from "./CategoriaPaper";
import { useHistory } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import BtnNextPrevious from "./BtnNextPrevious";

export default function CategoriaList({ filter, perPage }) {
  const history = useHistory();
  const isNewPage = history.location.pathname.includes("new");
  const pageIndexParams = history.location.pathname.split("/");
  const page = parseInt(
    isNewPage ? pageIndexParams[pageIndexParams.length - 1] : 1
  );

  // const getQueryVariables = (isNewPage, page) => {
  //   const skip = isNewPage ? (page - 1) * CLIENTES_PER_PAGE : 0;
  //   const take = CLIENTES_PER_PAGE;
  //   const orderBy = { createdAt: "desc" };
  //   return { take, skip, orderBy };
  // };
  const { data, loading, error } = useQuery(GET_CATEGORIAS, {
    variables: {
      filter,
      take: perPage,
      skip: isNewPage ? (page - 1) * perPage : 0,
    },
  });

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <>
      <Grid container spacing={1}>
        {data.categorias.map((categoria) => (
          <Grid item key={`categoria-grid-${categoria.id}`}>
            <CategoriaPaper
              categoria={categoria}
              key={`categoria-${categoria.id}`}
            />
          </Grid>
        ))}
      </Grid>
      <Container>
        <Grid container>
          {isNewPage && (
            <Grid item>
              <BtnNextPrevious isNext={false} page={page} history={history} />
            </Grid>
          )}
          {data?.categorias.length >= perPage && (
            <Grid item>
              <BtnNextPrevious isNext={true} page={page} history={history} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
