import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "./graphql/query";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";
import FilterBar from "./components/FilterBar";
import { useHistory } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";

export default function Item() {
  const ITEMS_PER_PAGE = 2;
  const history = useHistory();
  const isNewPage = history.location.pathname.includes("new");
  const pageIndexParams = history.location.pathname.split("/");
  const page = parseInt(
    isNewPage ? pageIndexParams[pageIndexParams.length - 1] : 1
  );
  console.log("isnewpate:", isNewPage);
  console.log("pageIndexParams:", pageIndexParams);
  console.log("page:", page);

  const BtnNextPrevious = ({ isNext }) => {
    const previousHandler = () => {
      if (page === 2) {
        history.push(`/item`);
      }
      if (page > 2) {
        history.push(`item/new/${page - 1}`);
      }
    };
    const nextHandler = () => {
      console.log("next data", data);
      console.log("next page", page);
      if (data?.items.length >= ITEMS_PER_PAGE) {
        console.log("next");
        history.push(`item/new/${page + 1}`);
      }
    };
    return (
      <Button
        variant="outlined"
        onClick={isNext ? nextHandler : previousHandler}
      >
        {isNext ? "next" : "previous"}
      </Button>
    );
  };

  const getQueryVariables = (isNewPage, page) => {
    const skip = isNewPage ? (page - 1) * ITEMS_PER_PAGE : 0;
    const take = ITEMS_PER_PAGE;
    const orderBy = { createdAt: "desc" };
    return { take, skip, orderBy };
  };

  const getItemsToRender = (isNewPage, data) => {
    if (isNewPage) {
      return data.items;
    }
    const rankedItems = data.items.slice();
    // rankedItems.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedItems;
  };

  const [filter, setFilter] = useState("");
  // const [take, setTake] = useState(5);
  // const [skip, setSkip] = useState(0);
  const { take, skip } = getQueryVariables(isNewPage, page);

  const { data, loading, error } = useQuery(GET_ITEMS, {
    variables: { filter, take, skip },
  });
  console.log("data", data);

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>item pages</h1>
      <FilterBar />
      <hr />
      {
        //filtro y barra de busqueda
      }
      {data ? (
        <ItemList items={getItemsToRender(isNewPage, data)} />
      ) : (
        <div> data undefined puede que no este conectado al servidor</div>
      )}
      <CreateItemDialog />

      {isNewPage ? (
        <Container>
          <Grid container>
            <Grid item>
              <BtnNextPrevious isNext={false} />
            </Grid>
            <Grid item>
              <BtnNextPrevious isNext={true} />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Grid container>
          <Grid item>
            <BtnNextPrevious isNext={true} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
