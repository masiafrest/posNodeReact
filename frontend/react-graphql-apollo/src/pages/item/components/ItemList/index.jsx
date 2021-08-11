import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import { useHistory } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import ItemCard from './ItemCard'
import ItemAccordion from "./ItemAccordion";
import BtnNextPrevious from "./BtnNextPrevious";

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
            {
              view ?
                <ItemCard item={item} key={`item-${item.id}`} />
                :
                <ItemAccordion item={item} key={`item-${item.id}`} />
            }
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
          {data?.items.length >= take && (
            <Grid item>
              <BtnNextPrevious isNext={true} page={page} history={history} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
