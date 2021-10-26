import { Typography, Divider, Paper, Grid } from "@material-ui/core";

import EditDialogIcon from "./UsuarioDialog";
import DelBtn from "./DelBtn";

export default function UsuarioPaper({ data }) {
  const { id, nombre, rol } = data;
  return (
    <Paper elevation={14}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography align="center">
            {nombre} {rol}
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item xs={12}>
          <EditDialogIcon usuario={data} />
          <DelBtn id={id} />
        </Grid>
      </Grid>
    </Paper>
  );
}
