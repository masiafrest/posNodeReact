import dayjs from "dayjs";
import Table from "./VentaDialog/components/TablaContainer/VentaTable";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Grid,
} from "@material-ui/core";

export default function VentaAccordion({ data }) {
  const { fecha, usuarioNombre, clienteNombre, total, credito } = data;
  return (
    <Accordion elevation={14}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography>
              Fecha: {dayjs(fecha * 1).format("DD-MMM-YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Vendedor: {usuarioNombre}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Cliente: {clienteNombre}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Total: {total}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Estado: {credito ? "no pago" : "pagado"}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>
        <Table venta={data} isVenta={false} />
      </AccordionDetails>
    </Accordion>
  );
}
