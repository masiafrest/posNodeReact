import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "80px",
  },
}));

export default function LteFilter({ lteState }) {
  const classes = useStyles();
  const [lte, setLte] = lteState;

  return (
    <TextField
      label="Menor a"
      type="number"
      className={classes.textField}
      value={lte}
      inputProps={{
        inputMode: "numeric",
      }}
      onChange={(e) => {
        setLte(e.target.value * 1);
      }}
    />
  );
}
