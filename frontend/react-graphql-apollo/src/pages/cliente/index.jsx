import PagesLayout from "../../components/PagesLayout";

import { GET_CLIENTES } from "./graphql/query";
import ClienteList from "./components/ClienteList";
import CreateClienteDialog from "./components/ClienteDialog";
import SearchField from "./components/SearchField";
import { GET_CATEGORIAS } from "../categoria/graphql/query";

export default function Cliente() {
  return (
    <PagesLayout
      title="clientes"
      SearchField={SearchField}
      List={ClienteList}
      CreateDialog={CreateClienteDialog}
      getQuery={GET_CLIENTES}
    />
  );
}
