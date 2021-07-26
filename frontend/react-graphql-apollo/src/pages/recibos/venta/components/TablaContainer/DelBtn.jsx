import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { delLinea } from "../../../../../redux/features/reciboSlice";
import { useSnackbar } from "notistack";

export default function DelBtn({ tipo, id }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() => {
        dispatch(delLinea({ tipo, id }));
        enqueueSnackbar("item borrado", {
          variant: "warning",
        });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
