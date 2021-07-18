import { useDispatch, useSelector } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart as AddShoppingCartIcon } from "@material-ui/icons/";
import { useSnackbar } from "notistack";

export default function AddBtn({ item, reciboTipo }) {
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() => {
        const newLinea = { ...item };
        const hasId = lineas.some((linea) => linea.id === newLinea.id);
        if (!hasId) {
          newLinea.tipo = reciboTipo;
          newLinea.qty = 1;
          dispatch(pushLinea(newLinea));
          enqueueSnackbar("item agregado", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("item ya esta agregado", {
            variant: "warning",
          });
        }
      }}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
}
