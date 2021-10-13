import { Switch, Grid, FormControlLabel, FormGroup } from "@material-ui/core";

import CardViewIcon from "@material-ui/icons/ViewModule";
import PaperViewIcon from "@material-ui/icons/Dehaze";

export default function SwitchView({ view, setView }) {
    return (
        <Grid component="label" container alignItems="center"
            alignContent='center'
            spacing={0}>
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
    )
}
