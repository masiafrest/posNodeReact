import { useState, createContext } from "react";
import PagesLayout from "../../components/PagesLayout";

import FilterBar from "./components/FilterBar";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";

export default function Item() {
  return (
    <PagesLayout
      FilterBar={FilterBar}
      List={ItemList}
      CreateDialog={CreateItemDialog}
    />
  );
}
