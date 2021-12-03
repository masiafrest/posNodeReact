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
  console.log("item ", item);
  const {
    id,
    precio: { precio, precioMin },
    descripcion,
    categorias,
  } = item;

  const newLinea = {
    id,
    tipo: reciboTipo,
    qty: 1,
    descripcion: `${descripcion} | ${categorias
      .map((e) => e.nombre)
      .join(", ")}`,
    precio,
    precioMin,
    enqueueSnackbar,
  };

  dispatch(pushLinea(newLinea));
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
