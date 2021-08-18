import PagesLayout from "../../components/PagesLayout";

import { GET_CATEGORIAS } from "./graphql/query";

import SearchField from './components/SearchField'
import CategoriaList from "./components/CategoriaList";
import CreateCategoriaDialog from "./components/CategoriaDialog";

export default function Categoria() {
  return (
    <PagesLayout
      title="categorias"
      SearchField={SearchField}
      List={CategoriaList}
      CreateDialog={CreateCategoriaDialog}
      getQuery={GET_CATEGORIAS}
    />
  );
}
