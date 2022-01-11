import { useDispatch, useSelector } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart as AddShoppingCartIcon } from "@material-ui/icons/";
import { useSnackbar } from "notistack";

import addLinea from "../../../components/addLineaItem";

export default function AddBtn({ item, reciboTipo }) {
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() =>
        addLinea(dispatch, pushLinea, enqueueSnackbar, item, reciboTipo)
      }
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
}
