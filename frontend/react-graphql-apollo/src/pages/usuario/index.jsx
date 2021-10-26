import PagesLayout from "../../components/PagesLayout";

import UsuarioPaper from "./components/UsuarioPaper";
import { getViewComp } from "../../utils";

import { GET_USUARIO } from "./graphql/query";
import CreateUsuarioDialog from "./components/UsuarioDialog";
import SearchField from "./components/SearchField";

export default function Usuario() {
  const viewComp = getViewComp(UsuarioPaper);
  console.log("clientes vies", viewComp);
  return (
    <PagesLayout
      title="usuarios"
      SearchField={SearchField}
      CreateDialog={CreateUsuarioDialog}
      getQuery={GET_USUARIO}
      viewComp={viewComp}
    />
  );
}
