import React from "react";
import ItemAccordion from "../ItemAccordion";

export default function ItemList({ items }) {
  console.log(items);
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return items.map((item) => (
    <ItemAccordion item={item} key={`item-${item.id}`} />
  ));
}
