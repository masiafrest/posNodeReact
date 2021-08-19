import PagesLayout from "../../../components/PagesLayout";

import { GET_DEVOLUCIONES } from "./grapql/query";

import DevolucionAccordion from "./components/DevolucionAccordion";
import { getViewComp } from "../../utils";

import DevolucionDialog from "./components/DevolucionDialog";
import SearchField from "./components/SearchField";

export default function Devolucion() {
  const viewComp = getViewComp(DevolucionAccordion, DevolucionAccordion);
  return (
    <PagesLayout
      title="ventas"
      SearchField={SearchField}
      CreateDialog={DevolucionDialog}
      getQuery={GET_DEVOLUCIONES}
      viewComp={viewComp}
    />
  );
}
