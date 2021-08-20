import PagesLayout from "../../components/PagesLayout";

import ClientePaper from "./components/ClientePaper";
import { getViewComp } from "../utils";

import { GET_CLIENTES } from "./graphql/query";
import CreateClienteDialog from "./components/ClienteDialog";
import SearchField from "./components/SearchField";

export default function Cliente() {
  const viewComp = getViewComp(ClientePaper);
  console.log("clientes vies", viewComp);
  return (
    <PagesLayout
      title="clientes"
      SearchField={SearchField}
      CreateDialog={CreateClienteDialog}
      getQuery={GET_CLIENTES}
      viewComp={viewComp}
    />
  );
}
