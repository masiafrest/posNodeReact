import { TextField } from "@material-ui/core";

export default function LteFilter({ lteState }) {
  const [lte, dispatch] = lteState;

  return (
    <TextField
      label="Menor a"
      type="number"
      value={lte}
      inputProps={{
        inputMode: "numeric",
      }}
      onChange={(e) => {
        dispatch({ type: "lte", payload: e.target.value * 1 });
      }}
    />
  );
}
