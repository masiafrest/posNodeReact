import ReciboVenta from "./components/ReciboVenta";
import useToggle from "../../../../../utils/hooks/useToggle";

import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";

export default function VentaDialog() {
  const [open, toggleOpen] = useToggle();

  return (
    <>
      <Button variant="contained" onClick={toggleOpen}>
        hacer venta
      </Button>
      <Dialog open={open} onClose={toggleOpen} fullWidth>
        <DialogTitle>Recibo Venta</DialogTitle>
        <DialogContent>
          <ReciboVenta toggleOpen={toggleOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
