import { useContext } from "react";
import { ShouldSubmit } from "../ReciboVenta";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { delLinea } from "../../../../../../../redux/features/reciboSlice";
import { useSnackbar } from "notistack";

export default function DelBtn({ tipo, id, idx }) {
  const [shouldSubmit, setShouldSubmit] = useContext(ShouldSubmit);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() => {
        dispatch(delLinea({ tipo, id }));
        enqueueSnackbar("item borrado", {
          variant: "warning",
        });
        setShouldSubmit((oldValue) => {
          delete oldValue.itemErrors[idx];
          return oldValue;
        });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
