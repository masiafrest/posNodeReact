import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import { useSnackbar } from "notistack";

export default function CloseSnackBar({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CancelIcon />
    </IconButton>
  );
}
