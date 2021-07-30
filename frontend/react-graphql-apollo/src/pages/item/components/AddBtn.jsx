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
        const {
          id,
          marca,
          modelo,
          precio: { precio, precioMin },
          descripcion,
        } = item;
        const hasId = lineas.some((linea) => linea.id === id);
        if (!hasId) {
          const newLinea = {
            id,
            tipo: reciboTipo,
            qty: 1,
            descripcion: `${marca} ${modelo} ${descripcion}`,
            precio,
            precioMin,
          };
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
