import React from "react";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ItemAccordion({ cliente }) {
  return (
    <Paper elevation={14}>
      <Typography>
        {cliente.nombre} {cliente.telefono}
      </Typography>
      <Divider variant="middle" />
      <Typography>dirrecbion: {cliente.dirrecion} </Typography>
      <EditDialogIcon cliente={cliente} />
      <IconButton aria-label="addToCart">
        <AddShoppingCartIcon color="action" />
      </IconButton>
      <IconButton aria-label="delete">
        {/* add del dialog js*/}
        <DeleteIcon color="error" />
      </IconButton>
    </Paper>
  );
}
