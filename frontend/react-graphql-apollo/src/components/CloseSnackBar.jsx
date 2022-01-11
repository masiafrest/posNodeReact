import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import { useSnackbar } from "notistack";

export default function CloseSnackBar({ snackbarKey, notistackRef }) {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton onClick={() => notistackRef.current.closeSnackbar(snackbarKey)}>
      <CancelIcon />
    </IconButton>
  );
}
