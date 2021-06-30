import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import ItemAccordion from "./ItemAccordion";
import { useHistory } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import BtnNextPrevious from "./BtnNextPrevious";

export default function ItemList({ filter }) {
  const ITEMS_PER_PAGE = 2;
  const history = useHistory();
  const isNewPage = history.location.pathname.includes("new");
  const pageIndexParams = history.location.pathname.split("/");
  const page = parseInt(
    isNewPage ? pageIndexParams[pageIndexParams.length - 1] : 1
  );

  const getQueryVariables = (isNewPage, page) => {
    const skip = isNewPage ? (page - 1) * ITEMS_PER_PAGE : 0;
    const take = ITEMS_PER_PAGE;
    const orderBy = { createdAt: "desc" };
    return { take, skip, orderBy };
  };
  const { take, skip } = getQueryVariables(isNewPage, page);
  console.log("isNewPage", isNewPage);
  console.log("pageIndexParams", pageIndexParams);
  console.log("page", page);
  console.log("skip", skip);
  const { data, loading, error } = useQuery(GET_ITEMS, {
    variables: { filter, take, skip },
  });

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <>
      <Grid container spacing={1}>
        {data.items.map((item) => (
          <Grid item key={`item-grid-${item.id}`}>
            <ItemAccordion item={item} key={`item-${item.id}`} />
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
          {data?.items.length >= ITEMS_PER_PAGE && (
            <Grid item>
              <BtnNextPrevious isNext={true} page={page} history={history} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
