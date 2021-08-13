import { useState, useContext } from "react";
import { FilterBarState } from '../../'

import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import ItemCard from "./ItemCard";
import ItemAccordion from "./ItemAccordion";

import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export default function ItemList() {
  const { pageState: [page, setPage],
    filterState: [filter, setFilter],
    takeState: [take, setTake],
    viewState: [view, setView]
  } = useContext(FilterBarState)
  console.log('page: ', page)
  const skip = page === 1 ? 0 : (page - 1) * take
  const { data, loading, error } = useQuery(GET_ITEMS, {
    variables: { filter, take, skip },
  });

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;
  const pages = Math.round(data.items.count / take)
  console.log('pages: ', pages)
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <>
      <Pagination
        count={pages}
        page={page}
        onChange={(e, p) => {
          setPage(p)
        }}
      />
      <Grid container spacing={1}>
        {data.items.items.map((item) => (
          <Grid item key={`item-grid-${item.id}`}>
            {view ? (
              <ItemCard item={item} key={`item-${item.id}`} />
            ) : (
              <ItemAccordion item={item} key={`item-${item.id}`} />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
