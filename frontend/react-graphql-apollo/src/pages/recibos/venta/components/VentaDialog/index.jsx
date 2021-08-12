import { useState } from "react";
import ReciboVenta from "./components/ReciboVenta";

import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";

export default function VentaDialog() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        hacer venta
      </Button>
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>Recibo Venta</DialogTitle>
        <DialogContent>
          <ReciboVenta closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
