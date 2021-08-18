import PagesLayout from "../../../components/PagesLayout";

import { GET_VENTAS } from "./grapql/query";

import VentaDialog from "./components/VentaDialog";
import VentaList from "./components/VentaList";
import SearchField from "./components/SearchField";

export default function Venta() {
  return (
    <PagesLayout
      title="ventas"
      SearchField={SearchField}
      List={VentaList}
      CreateDialog={VentaDialog}
      getQuery={GET_VENTAS}
    />
  );
}
