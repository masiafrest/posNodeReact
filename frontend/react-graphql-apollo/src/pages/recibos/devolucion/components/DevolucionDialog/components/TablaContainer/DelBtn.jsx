import { useContext } from "react";
import { ReciboState } from "../ReciboVenta";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { delLinea } from "../../../../../../../redux/features/reciboSlice";
import { useSnackbar } from "notistack";

export default function DelBtn({ tipo, id, idx }) {
  const { shouldSubmit: [shouldSubmit, setShouldSubmit] } = useContext(ReciboState);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() => {
        dispatch(delLinea({ tipo, id }));
        enqueueSnackbar("item borrado", {
          variant: "warning",
        });
        setShouldSubmit(
          {
            ...shouldSubmit,
            isPriceError: false
          }
        );
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
