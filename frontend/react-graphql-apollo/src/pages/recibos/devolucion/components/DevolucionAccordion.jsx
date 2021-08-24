import dayjs from "dayjs";
import Table from "./DevolucionDialog/components/TablaContainer/DevolucionTable";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@material-ui/core";

export default function VentaAccordion({ data }) {
  const { fecha, usuario, cliente } = data;
  return (
    <Accordion elevation={14}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          Fecha:
          {dayjs(fecha).format("MMM-DD-YYYY")}, Cliente:
          {cliente.nombre}, Vendedor:{usuario.nombre}
        </Typography>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>
        <Table venta={data} isForView={true} />
      </AccordionDetails>
      {/* <AccordionActions></AccordionActions> */}
    </Accordion>
  );
}
