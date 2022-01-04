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
    categorias,
    descripcion,
    caracteristicas,
    modelos,
    color,
    marca,
  } = item;
  const newLinea = {
    id,
    tipo: reciboTipo,
    qty: 1,
    descripcion: `${descripcion} | ${marca?.nombre}, ${modelos
      .map((e) => e.nombre)
      .join(", ")} | ${color ? `${color?.nombre} |` : ""} ${caracteristicas
      .map((e) => e.nombre)
      .join(", ")} | ${categorias.map((e) => e.nombre).join(", ")}`,
    precio,
    precioMin,
    enqueueSnackbar,
  };
  console.log(newLinea.descripcion);

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
