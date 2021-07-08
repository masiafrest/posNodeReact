import { useDispatch, useSelector } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart as AddShoppingCartIcon } from "@material-ui/icons/";

export default function AddBtn({ item, reciboTipo }) {
  const dispatch = useDispatch();
  return (
    <IconButton
      onClick={() => {
        const newLinea = { ...item };
        newLinea.tipo = reciboTipo;
        newLinea.qty = 1;
        dispatch(pushLinea(newLinea));
      }}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
}
