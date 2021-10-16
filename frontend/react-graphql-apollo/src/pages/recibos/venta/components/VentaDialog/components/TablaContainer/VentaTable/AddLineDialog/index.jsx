import { useState } from "react";

import { useSnackbar } from "notistack";
//redux
import { useSelector, useDispatch } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";

export default function VentaDialog() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Agregar una lina personalizada
      </Button>
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>Agregar linea</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div>
              <TextField
                name="qty"
                onChange={null}
                label={"Qty"}
                id={"Qty"}
                margin="dense"
              />
            </div>
            <div>
              <TextField
                name="qty"
                onChange={null}
                label={"Qty"}
                id={"Qty"}
                margin="dense"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
