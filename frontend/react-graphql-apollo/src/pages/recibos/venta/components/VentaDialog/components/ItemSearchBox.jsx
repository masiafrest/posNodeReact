import { useState } from "react";

import CategoriaFilterSelect from "../../../../../../components/PagesLayout/components/FilterBar/components/CategoriaFilter";
import SearchOnAutoComplete from "../../../../components/SearchOnAutoComplete";
import { GET_ITEMS } from "../../../../../item/graphql/query";

export default function ItemSearchBox() {
  const [categoria, setCategoria] = useState("todos");
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <SearchOnAutoComplete
          queryName="items"
          getQuery={GET_ITEMS}
          categoriaFilter={categoria}
        />
      </div>
      <CategoriaFilterSelect categoriaState={[categoria, setCategoria]} />
    </div>
  );
}
