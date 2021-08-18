import PagesLayout from "../../components/PagesLayout";

import { GET_ITEMS } from "./graphql/query";

import SearchField from "./components/SearchField";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";

export default function Item() {
  return (
    <PagesLayout
      title="items"
      SearchField={SearchField}
      List={ItemList}
      CreateDialog={CreateItemDialog}
      getQuery={GET_ITEMS}
    />
  );
}
