import PagesLayout from "../../../components/PagesLayout";

import { GET_VENTAS } from "./grapql/query";

import VentaAccordion from "./components/VentaAccordion";
import { getViewComp } from "../../../utils";

import VentaDialog from "./components/VentaDialog";
import SearchField from "./components/SearchField";

export default function Venta() {
  const viewComp = getViewComp(VentaAccordion);
  return (
    <PagesLayout
      title="ventas"
      SearchField={SearchField}
      CreateDialog={VentaDialog}
      getQuery={GET_VENTAS}
      viewComp={viewComp}
    />
  );
}
