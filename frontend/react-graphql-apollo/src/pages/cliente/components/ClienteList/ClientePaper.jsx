import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Divider,
  IconButton,
  Paper,
} from "@material-ui/core";

import EditDialogIcon from "../ClienteDialog";
import DelBtn from "./DelBtn";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ClientePaper({ cliente }) {
  return (
    <Paper elevation={14}>
      <Typography>
        {cliente.nombre} {cliente.telefono}
      </Typography>
      <Divider variant="middle" />
      <Typography>dirrecbion: {cliente.dirrecion} </Typography>
      <EditDialogIcon cliente={cliente} />
      <DelBtn id={cliente.id} />
    </Paper>
  );
}
