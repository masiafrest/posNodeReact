import { useDispatch, useSelector } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart as AddShoppingCartIcon } from "@material-ui/icons/";
import { useSnackbar } from "notistack";

export const addLinea = (
  dispatch,
  pushLinea,
  enqueueSnackbar,
  item,
  lineas,
  reciboTipo
) => {
  const {
    id,
    precio: { precio, precioMin },
    descripcion,
  } = item;
  const hasId = lineas.some((linea) => linea.id === id);
  if (!hasId) {
    const newLinea = {
      id,
      tipo: reciboTipo,
      qty: 1,
      descripcion: descripcion,
      precio,
      precioMin,
    };
    dispatch(pushLinea(newLinea));
    enqueueSnackbar(`item ${descripcion} agregado`, {
      variant: "success",
    });
  } else {
    enqueueSnackbar(`item ${descripcion} ya esta agregado`, {
      variant: "warning",
    });
  }
};

export default function AddBtn({ item, reciboTipo }) {
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() =>
        addLinea(dispatch, pushLinea, enqueueSnackbar, item, lineas, reciboTipo)
      }
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
}
