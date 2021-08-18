import {
  Typography,
  Divider,
  Paper,
} from "@material-ui/core";

import EditDialogIcon from "./ClienteDialog";
import DelBtn from "./DelBtn";

export default function ClientePaper({ data }) {
  return (
    <Paper elevation={14}>
      <Typography>
        {data.nombre} {data.telefono}
      </Typography>
      <Divider variant="middle" />
      <Typography>dirrecion: {data.dirrecion} </Typography>
      <EditDialogIcon cliente={data} />
      <DelBtn id={data.id} />
    </Paper>
  );
}
