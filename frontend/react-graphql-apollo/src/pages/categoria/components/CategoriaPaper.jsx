import { Typography, Divider, Grid, Paper } from "@material-ui/core";

import EditDialogIcon from "./CategoriaDialog";
import DelBtn from "./DelBtn";

export default function CategoriaPaper({ data }) {
  const { id, nombre } = data;
  return (
    <Paper elevation={14}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography align="center">{nombre}</Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item xs={12}>
          <EditDialogIcon categoria={data} />
          <DelBtn id={id} />
        </Grid>
      </Grid>
    </Paper>
  );
}
