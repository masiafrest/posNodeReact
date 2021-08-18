import {
  Typography,
  Divider,
  Paper,
} from "@material-ui/core";

import EditDialogIcon from "./CategoriaDialog";
import DelBtn from "./DelBtn";

export default function CategoriaPaper({ data }) {
  return (
    <Paper elevation={14}>
      <Typography>{data.nombre}</Typography>
      <Divider variant="middle" />
      <EditDialogIcon categoria={data} />
      <DelBtn id={data.id} />
    </Paper>
  );
}
