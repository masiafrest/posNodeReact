import dayjs from "dayjs";
import Table from "./VentaDialog/components/TablaContainer/VentaTable";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@material-ui/core";

export default function VentaAccordion({ data }) {
  const { fecha, usuarioNombre, clienteNombre, total } = data;
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
          {clienteNombre}, Total:
          {total}, Vendedor:{usuarioNombre}
        </Typography>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>
        <Table venta={data} isVenta={false} />
      </AccordionDetails>
      {/* <AccordionActions></AccordionActions> */}
    </Accordion>
  );
}
