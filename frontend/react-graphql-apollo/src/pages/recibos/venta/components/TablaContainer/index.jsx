// import PaperTable from "./Paper";
import Table from "./Table";
// import {} from "../../../../../redux/features/reciboSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Tabla() {
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  return <Table lineas={lineas || []} />;
}
