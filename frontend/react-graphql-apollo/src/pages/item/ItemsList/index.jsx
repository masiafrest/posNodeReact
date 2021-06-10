import React from "react";
import ItemAccordion from '../components/ItemAccordion'

export default function ItemsList({ data }) {
  return data.map(item => <ItemAccordion item={item} key={`item-${item.id}`}/>) 
}
