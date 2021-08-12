import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import { useHistory } from "react-router-dom";
import VentaCard from "./ItemCard";
import VentaAccordion from "./ItemAccordion";
import PaginationBtn from "./PaginationBtn";

import { Container, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export default function ItemList({ filter, take, view }) {
  const history = useHistory();
  const isNewPage = history.location.pathname.includes("new");
  const pageIndexParams = history.location.pathname.split("/");
  const page = parseInt(
    isNewPage ? pageIndexParams[pageIndexParams.length - 1] : 1
  );

  const { data, loading, error } = useQuery(GET_ITEMS, {
    variables: { filter, take, skip: isNewPage ? (page - 1) * take : 0 },
  });

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <>
      <Grid container spacing={1}>
        {data.items.map((item) => (
          <Grid item key={`item-grid-${item.id}`}>
            {view ? (
              <VentaCard item={item} key={`item-${item.id}`} />
            ) : (
              <VentaAccordion item={item} key={`item-${item.id}`} />
            )}
          </Grid>
        ))}
      </Grid>
      <Container>
        <Grid container>
          {isNewPage && (
            <Grid item>
              <PaginationBtn isNext={false} page={page} history={history} />
            </Grid>
          )}
          {data?.items.length >= take && (
            <Grid item>
              <PaginationBtn isNext={true} page={page} history={history} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
