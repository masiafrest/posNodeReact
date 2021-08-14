import PagesLayout from "../../components/PagesLayout";

import CategoriaList from "./components/CategoriaList";
import CreateCategoriaDialog from "./components/CategoriaDialog";
import FilterBar from "./components/FilterBar";

export default function Categoria() {
  return (
    <PagesLayout
      title="categoria pages"
      FilterBar={FilterBar}
      List={CategoriaList}
      CreateDialog={CreateCategoriaDialog}
    />
  );
}
