import PagesLayout from "../../../components/PagesLayout";

import VentaDialog from "./components/VentaDialog";
// import VentaList from "./components/VentaList";
import FilterBar from "./components/FilterBar/index.jsx";

export default function Venta() {
  return (
    <PagesLayout
      title="venta pages"
      FilterBar={FilterBar}
      List={() => <h>lista de ventas</h>}
      CreateDialog={VentaDialog}
    />
  );
}
