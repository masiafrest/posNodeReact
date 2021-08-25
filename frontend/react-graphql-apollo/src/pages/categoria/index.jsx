import PagesLayout from "../../components/PagesLayout";

import { GET_CATEGORIAS } from "./graphql/query";

import CategoriaPaper from "./components/CategoriaPaper";
import { getViewComp } from "../../utils";

import SearchField from "./components/SearchField";
import CreateCategoriaDialog from "./components/CategoriaDialog";

export default function Categoria() {
  const viewComp = getViewComp(CategoriaPaper);
  return (
    <PagesLayout
      title="categorias"
      SearchField={SearchField}
      CreateDialog={CreateCategoriaDialog}
      getQuery={GET_CATEGORIAS}
      viewComp={viewComp}
    />
  );
}
