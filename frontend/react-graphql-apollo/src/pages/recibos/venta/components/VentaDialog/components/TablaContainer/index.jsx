// import PaperTable from "./Paper";
import Table from "./Table";
// import {} from "../../../../../redux/features/reciboSlice";
import { useSelector } from "react-redux";

export default function Tabla() {
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  return <Table lineas={lineas || []} />;
}
