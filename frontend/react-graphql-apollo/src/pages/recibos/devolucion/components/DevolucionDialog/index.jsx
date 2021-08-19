import { useState } from "react";
import ReciboDevolucion from "./components/ReciboDevolucion";

import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";

export default function DevolucionDialog() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        hacer devolucion
      </Button>
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>Recibo Venta</DialogTitle>
        <DialogContent>
          <ReciboDevolucion closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
