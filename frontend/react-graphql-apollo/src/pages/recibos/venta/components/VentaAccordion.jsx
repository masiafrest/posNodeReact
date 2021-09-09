import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { UpdateVenta } from "../grapql/mutation";

import Table from "./VentaDialog/components/TablaContainer/VentaTable";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";

export default function VentaAccordion({ data }) {
  const [updateVenta, { ventaData, loading, error }] = useMutation(UpdateVenta);

  const { fecha, usuarioNombre, clienteNombre, total, credito, id } = data;
  return (
    <Accordion elevation={14} key={id}>
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
        <Grid container>
          <Grid item xs={12}>
            <Table venta={data} isVenta={false} />
          </Grid>
          {credito && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() =>
                  updateVenta({ variables: { id, credito: false } })
                }
              >
                pagado
              </Button>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
