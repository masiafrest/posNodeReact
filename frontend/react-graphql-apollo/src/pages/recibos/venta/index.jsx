import ClientSelect from "./components/ClientSelect";
import TableContainer from "./components/TablaContainer";
import SearchItem from "../../item/components/FilterBar";
// import { useSelector } from "react-redux";
// import { useSnackbar } from "notistack";
// import ReactToPrint from "react-to-print";
// import ComponentToPrint from "../../components/ComponentToPrint";

export default function Venta() {
  return (
    <>
      <ClientSelect />
      <SearchItem />
      <TableContainer />
    </>
  );
}
