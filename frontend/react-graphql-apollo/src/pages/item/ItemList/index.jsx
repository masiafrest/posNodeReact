import React from "react";
import ItemAccordion from "../components/ItemAccordion";

export default function ItemList({ items }) {
  console.log(items);
  return items.map((item) => (
    <ItemAccordion item={item} key={`item-${item.id}`} />
  ));
}
