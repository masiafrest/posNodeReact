import { useState } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export default function IsPagadoCheck({ isCreditoState }) {
  const [checked, setChecked] = isCreditoState;
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <FormControlLabel
      control={
        <Checkbox name="isCredito" checked={checked} onChange={handleChange} />
      }
      label="Credito"
    />
  );
}
