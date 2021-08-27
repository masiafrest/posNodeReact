import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import { useSnackbar } from "notistack";

export default function CloseSnackBar({ key }) {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton onClick={() => closeSnackbar(key)}>
      <CancelIcon />
    </IconButton>
  );
}
