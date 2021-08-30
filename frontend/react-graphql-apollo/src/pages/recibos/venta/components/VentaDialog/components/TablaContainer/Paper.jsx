import React from "react";
import { Paper, Grid, Container } from "@material-ui/core";

const Row = ({ title = false, item }) => {
  return (
    <>
      <Grid item xs md>
        <Paper> {title ? "qty" : item?.qty} </Paper>
      </Grid>
      <Grid item xs={7} md={10}>
        <Paper> {title ? "descripcion" : item?.descripcion} </Paper>
      </Grid>
      <Grid item xs md>
        <Paper> {title ? "precio" : item?.precio?.precio}</Paper>
      </Grid>
      <Grid item xs md>
        <Paper> {title ? "total" : item?.qty * item?.precio.precio}</Paper>
      </Grid>
    </>
  );
};

const item = {
  barcode: 11111111,
  sku: "hua-y9",
  descripcion: "huawei y9 17 lcd negra",
  qty: 10,
  precio: {
    precio: 10,
    precioMin: 8,
  },
};

export default function SimplePaper() {
  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={1}>
        <Row title={true} />
      </Grid>
      <Grid container item xs={12} spacing={1}>
        <Row item={item} />
      </Grid>
    </Grid>
  );
}
