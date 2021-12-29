import React from "react";
import EditDialogIcon from "../ItemDialog";
import DelBtn from "../DelBtn";
import AddBtn from "../AddBtn";
import Table from "./Table";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Divider,
  Chip,
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
    precio: { precio, precioMin },
    ubicacion,
    image_url,
    marca,
    color,
  } = data;
  console.table(data);
  const joinEl = (array) => array.map((e) => e.nombre).join(", ");
  const modelos = joinEl(data.modelos);
  //const caracteristicas = joinEl(data.caracteristicas);

  const caracteristicasChip = data.caracteristicas.map((cat) => (
    <Chip size="small" variant="outline" label={cat.nombre} />
  ));

  const categoriasChip = data.categorias.map((cat) => (
    <Chip size="small" label={cat.nombre} />
  ));

  return (
    <Accordion elevation={14}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {marca?.nombre} {modelos}
        </Typography>
        <Typography>
          {color?.nombre} {caracteristicasChip} {categoriasChip}
        </Typography>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>
        <Table
          headers={["qty", "precio", "precio min"]}
          bodies={[qty, precio, precioMin]}
        />
      </AccordionDetails>
      <AccordionActions>
        <EditDialogIcon item={data} />
        <AddBtn item={data} reciboTipo="venta" />
        <DelBtn id={id} paths={image_url ? image_url : ""} />
      </AccordionActions>
    </Accordion>
  );
}
