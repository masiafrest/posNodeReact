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

import { makeStyles } from "@material-ui/styles";
const useStyle = makeStyles(() => ({
  fontWeight: {
    fontWeight: "bold",
  },
}));
export default function VentaAccordion({ data }) {
  const classes = useStyle();
  const BoldTypography = ({ title, body, colon = true }) => (
    <>
      <Typography className={classes.fontWeight}>
        {title}
        {colon ? ":" : null}
      </Typography>
      {body}
    </>
  );
  const [updateVenta, { ventaData, loading, error }] = useMutation(UpdateVenta);

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
  return (
    <Accordion elevation={14} key={id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <BoldTypography title="N° Recibo" body={id} />
          </Grid>
          <Grid item sm={6}>
            <BoldTypography
              title="Fecha"
              body={dayjs(fecha * 1).format("DD-MMM-YYYY")}
            />
          </Grid>
          <Grid item sm={6}>
            <BoldTypography title="Vendedor" body={usuarioNombre} />
          </Grid>
          <Grid item sm={6}>
            <BoldTypography title="Cliente" body={clienteNombre} />
          </Grid>
          <Grid item xs={6}>
            <BoldTypography title={`Total: ${total}`} colon={false} />
          </Grid>
          <Grid item xs={6}>
            <BoldTypography
              title={`Estado: ${credito ? "no pago" : "pagado"}`}
              colon={false}
            />
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
        <PrintBtn btnComp={<button>imprimir</button>} venta={venta} />
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
