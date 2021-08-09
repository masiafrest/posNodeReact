import React from "react";
import EditDialogIcon from "../ItemDialog";
import DelBtn from "../DelBtn";
import AddBtn from "../AddBtn";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Divider,
} from "@material-ui/core";

export default function ItemAccordion({ item }) {
  const categorias = item.categorias.map((cat) => cat.nombre).join(", ");
  console.log('item: ', item)
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
          {categorias}, images: {item.image_url}
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <EditDialogIcon item={item} />
        <AddBtn item={item} reciboTipo="venta" />
        <DelBtn id={item.id} />
      </AccordionActions>
    </Accordion>
  );
}
