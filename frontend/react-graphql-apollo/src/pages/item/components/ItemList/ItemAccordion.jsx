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
  const { id, marca, modelo, descripcion, qty, precio: { precio }, ubicacion, image_url } = item
  const categorias = item.categorias.map((cat) => cat.nombre).join(", ");
  const imgArr = image_url.split(', ')
  console.log('item: ', image_url.split(', '))
  return (
    <Accordion elevation={14}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {marca}, {modelo}, {descripcion}
        </Typography>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>

        <Typography>
          qty: {qty}, precio:{precio}, ubicacion:
          {ubicacion.tipo},{ubicacion.dirrecion}, categorias:{" "}
          {categorias}
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <EditDialogIcon item={item} />
        <AddBtn item={item} reciboTipo="venta" />
        <DelBtn id={id} paths={imgArr} />
      </AccordionActions>
    </Accordion>
  );
}
