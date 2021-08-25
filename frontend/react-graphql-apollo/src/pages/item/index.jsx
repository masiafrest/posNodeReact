import PagesLayout from "../../components/PagesLayout";

import { GET_ITEMS } from "./graphql/query";

import ItemCard from "./components/ItemCard";
import ItemAccordion from "./components/ItemAccordion";
import { getViewComp } from "../../utils";

import SearchField from "./components/SearchField";
import CreateItemDialog from "./components/ItemDialog/";

export default function Item() {
  const viewComp = getViewComp(ItemCard, ItemAccordion);
  return (
    <PagesLayout
      title="items"
      SearchField={SearchField}
      CreateDialog={CreateItemDialog}
      getQuery={GET_ITEMS}
      viewComp={viewComp}
    />
  );
}
