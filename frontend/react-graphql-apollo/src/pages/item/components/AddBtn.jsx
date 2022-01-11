import { useDispatch, useSelector } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart as AddShoppingCartIcon } from "@material-ui/icons/";
import { useSnackbar } from "notistack";

import addLinea from "../../../components/addLineaItem";

export default function AddBtn({ item, reciboTipo = "venta" }) {
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo[reciboTipo].lineas);
  console.log("lineas", lineas);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() => {
        if (lineas.some((linea) => linea.id === item.id)) {
          console.log("tiene linea");
          enqueueSnackbar(`item ${item.descripcion} ya esta agregado`, {
            variant: "warning",
          });
          return;
        }
        addLinea(dispatch, pushLinea, item, reciboTipo);
        enqueueSnackbar(`item ${item.descripcion} agregado`, {
          variant: "success",
        });
      }}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
}
