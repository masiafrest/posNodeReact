import { useState } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export default function IsPagadoCheck({ isCreditoState }) {
  const [checked, dispatch] = isCreditoState;
  const handleChange = (event) => {
    dispatch({ type: "isCredito", payload: event.target.checked });
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
