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

import EditDialogIcon from "../CategoriaDialog";
import DelBtn from "./DelBtn";
import DeleteIcon from "@material-ui/icons/Delete";

export default function CategoriaPaper({ categoria }) {
  return (
    <Paper elevation={14}>
      <Typography>{categoria.nombre}</Typography>
      <Divider variant="middle" />
      <EditDialogIcon categoria={categoria} />
      <DelBtn id={categoria.id} />
    </Paper>
  );
}
