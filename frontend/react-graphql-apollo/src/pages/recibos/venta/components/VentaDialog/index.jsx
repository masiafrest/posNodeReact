import { useState } from "react";
import ReciboVenta from "./components/ReciboVenta";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";

export default function VentaDialog() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>hacer venta</Button>
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>Recibo Venta</DialogTitle>
        <DialogContent>
          <ReciboVenta closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
