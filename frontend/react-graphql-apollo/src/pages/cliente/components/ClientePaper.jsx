import { Typography, Divider, Paper, Grid } from "@material-ui/core";

import EditDialogIcon from "./ClienteDialog";
import DelBtn from "./DelBtn";

export default function ClientePaper({ data }) {
  const { id, nombre, dirrecion } = data;
  return (
    <Paper elevation={14}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography align="center">{nombre}</Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item xs={12}>
          <EditDialogIcon cliente={data} />
          <DelBtn id={id} />
        </Grid>
      </Grid>
    </Paper>
  );
}
