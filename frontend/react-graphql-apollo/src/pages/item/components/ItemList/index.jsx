import React from "react";
import ItemAccordion from "./ItemAccordion";
import { Grid } from "@material-ui/core";

export default function ItemList({ items }) {
  console.log(items);
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <Grid container spacing={1}>
      {items.map((item) => (
        <Grid item key={`item-grid-${item.id}`}>
          <ItemAccordion item={item} key={`item-${item.id}`} />
        </Grid>
      ))}
    </Grid>
  );
}
