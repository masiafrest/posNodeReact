import { NativeSelect, Typography, Switch, Grid } from "@material-ui/core";
import CardViewIcon from "@material-ui/icons/ViewModule";
import PaperViewIcon from "@material-ui/icons/Dehaze";

export default function ViewSwitcher({ view, setView }) {
  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>
        <PaperViewIcon />
      </Grid>
      <Grid item>
        <Switch
          checked={view}
          onChange={() => setView(!view)}
          name="viewSwitch"
        />
      </Grid>
      <Grid item>
        <CardViewIcon />
      </Grid>
    </Grid>
  );
}
