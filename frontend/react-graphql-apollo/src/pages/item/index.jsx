import PagesLayout from "../../components/PagesLayout";

import { GET_ITEMS } from "./graphql/query";

import ItemCard from "./components/ItemCard";
import ItemAccordion from "./components/ItemAccordion";
import { getViewComp } from "../../utils";

import SearchBar from "./components/SearchItem";
import CreateItemDialog from "./components/ItemDialog/";

export default function Item() {
  const viewComp = getViewComp(ItemCard, ItemAccordion);
  return (
    <PagesLayout
      title="items"
      SearchField={SearchBar}
      CreateDialog={CreateItemDialog}
      getQuery={GET_ITEMS}
      viewComp={viewComp}
    />
  );
}
