import React from "react";
import EditDialogIcon from "../ItemDialog";
import DelBtn from "../DelBtn";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";

export default function ItemAccordion({ item }) {
  const categorias = item.categorias.map((cat) => cat.nombre).join(", ");
  return (
    <Accordion elevation={14}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {item.marca}, {item.modelo}, {item.descripcion}
        </Typography>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>
        <Typography>
          qty: {item.qty}, precio:{item.precio.precio}, ubicacion:
          {item.ubicacion.tipo},{item.ubicacion.dirrecion}, categorias:{" "}
          {categorias}
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <EditDialogIcon item={item} />
        <IconButton aria-label="addToCart">
          <AddShoppingCartIcon color="action" />
        </IconButton>
        <DelBtn id={item.id} />
      </AccordionActions>
    </Accordion>
  );
}
