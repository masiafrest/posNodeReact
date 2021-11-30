import { TextField } from "@material-ui/core";

export default function LteFilter({ lteState }) {
  const [lte, setLte] = lteState;

  return (
    <TextField
      label="Menor a"
      type="number"
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
