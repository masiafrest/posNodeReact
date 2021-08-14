import Table from "./Table";
import { useSelector } from "react-redux";

export default function Tabla() {
  const venta = useSelector((state) => state.recibo.venta);
  return <Table venta={venta} />;
}
