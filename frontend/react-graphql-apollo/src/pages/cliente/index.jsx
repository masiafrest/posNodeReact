import PagesLayout from "../../components/PagesLayout";

import ClienteList from "./components/ClienteList";
import CreateClienteDialog from "./components/ClienteDialog";
import FilterBar from "./components/FilterBar";

export default function Cliente() {
  return (
    <PagesLayout
      title="clientes pages"
      FilterBar={FilterBar}
      List={ClienteList}
      CreateDialog={CreateClienteDialog}
    />
  );
}
