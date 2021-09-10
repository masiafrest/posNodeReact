import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "200px",
  },
  lteBtn: {
    width: "105px",
    marginRight: "10px",
  },
  textField: {
    width: "30px",
  },
}));

export default function LteGteFilter({ lteState, gteState }) {
  const classes = useStyles();
  const [lte, setLte] = lteState;
  const [gte, setGte] = gteState;
  const [isLte, setIsLte] = useState(false);

  return (
    <div className={classes.root}>
      <Button
        className={classes.lteBtn}
        onClick={() => {
          setIsLte(!isLte);
          // isLte ? setLte(lte) : setGte(gte);
        }}
        variant="outlined"
      >
        {isLte ? "menor a:" : "mayor a:"}
      </Button>
      <TextField
        className={classes.textField}
        value={isLte ? lte : gte}
        onChange={(e) => {
          setLte(null);
          setGte(null);
          isLte ? setLte(e.target.value * 1) : setGte(e.target.value * 1);
        }}
      >
        lte
      </TextField>
    </div>
  );
}
