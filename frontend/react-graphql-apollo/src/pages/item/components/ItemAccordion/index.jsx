import React from "react";
import EditDialogIcon from "../ItemDialog";
import DelBtn from "../DelBtn";
import AddBtn from "../AddBtn";
import Table from "./Table";

import getDescription from "../../../../components/getDescription";

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
    qty,
    precio: { precio, precioMin },
    image_url,
    marca,
    modelos,
    color,
    categorias,
    caracteristicas,
  } = data;

  const chips = (arr, size = "small", variant = "default") =>
    arr.map((car) => (
      <Chip key={car.nombre} size={size} variant={variant} label={car.nombre} />
    ));

  return (
    <Accordion elevation={14}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <div>
          <Typography>
            <Typography style={{ fontWeight: 600 }}>
              {getDescription(marca, modelos, color)}
            </Typography>
            {chips(caracteristicas, "small", "outline")}
            {chips(categorias, "small")}
          </Typography>
        </div>
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
