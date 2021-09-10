import React from "react";
import EditDialogIcon from "./ItemDialog";
import DelBtn from "./DelBtn";
import AddBtn from "./AddBtn";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  text: {},
}));

export default function ItemAccordion({ data }) {
  const {
    id,
    descripcion,
    qty,
    precio: { precio },
    ubicacion,
    image_url,
  } = data;
  const categorias = data.categorias.map((cat) => cat.nombre).join(", ");
  const url = "http://localhost:4000/upload/item/";

  return (
    <Accordion elevation={14}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {descripcion} {categorias}
        </Typography>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>
        <Typography>
          qty: {qty}, precio:{precio}, ubicacion:
          {ubicacion.tipo},{ubicacion.dirrecion}, categorias: {categorias}
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <EditDialogIcon item={data} />
        <AddBtn item={data} reciboTipo="venta" />
        <DelBtn id={id} paths={image_url} />
      </AccordionActions>
    </Accordion>
  );
}
