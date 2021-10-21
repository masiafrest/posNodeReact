import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { UpdateVenta } from "../grapql/mutation";

import Table from "./VentaDialog/components/TablaContainer/VentaTable";
import PrintBtn from "./PrintBtn";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";

import DelBtn from "./DelBtn";

export default function VentaAccordion({ data }) {
  const [updateVenta, { ventaData, loading, error }] = useMutation(UpdateVenta);

  console.log("venta accordion data: ", data);
  const { fecha, usuarioNombre, clienteNombre, total, credito, id } = data;
  const venta = {};
  for (const [key, value] of Object.entries(data)) {
    if (key.toLowerCase().includes("nombre")) {
      if (key.includes("cliente")) {
        venta.cliente = clienteNombre;
      }
    } else {
      venta[key] = value;
    }
  }
  console.log("venta accordion venta: ", venta);
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
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <PrintBtn
          btnComp={<button>imprimir</button>}
          cliente={{ nombre: clienteNombre }}
          venta={venta}
        />
        <DelBtn id={id} />
        {credito && (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => updateVenta({ variables: { id, credito: false } })}
            >
              pagado
            </Button>
          </Grid>
        )}
      </AccordionActions>
    </Accordion>
  );
}
