import { useState } from "react";

import { useSnackbar } from "notistack";
//redux
import { useSelector, useDispatch } from "react-redux";
import { pushLinea } from "../../../../../../../../../redux/features/reciboSlice";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  DialogActions,
} from "@material-ui/core";

export default function VentaDialog() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = {
    id: 0,
    qty: 0,
    descripcion: "",
    precio: 0,
    tipo: "venta",
    enqueueSnackbar,
    custom: true,
  };
  const [open, setOpen] = useState(false);
  const [linea, setLinea] = useState(initialState);
  const closeDialog = () => {
    setOpen(false);
  };
  const handleOnChange = (e) => {
    const { value, name, valueAsNumber } = e.target;
    console.log("target, ", e.target);
    if (valueAsNumber) {
      return setLinea({ ...linea, [name]: valueAsNumber });
    }
    setLinea({ ...linea, [name]: value });
  };
  console.log("linea: ", linea);

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
              justifyContent: "center",
              columnGap: "10px",
            }}
          >
            <div
              style={{
                gridColumnStart: 1,
                gridColumnEnd: 3,
              }}
            >
              <TextField
                fullWidth
                name="descripcion"
                onChange={handleOnChange}
                label={"Descripcion"}
                id={"Descripcion"}
                margin="dense"
                value={linea.descripcion}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="number"
                name="qty"
                onChange={handleOnChange}
                label={"Qty"}
                id={"Qty"}
                margin="dense"
                value={linea.qty}
                inputProps={{ step: "1", inputMode: "decimal" }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="number"
                name="precio"
                onChange={handleOnChange}
                label={"Precio"}
                id={"Precio"}
                margin="dense"
                value={linea.precio}
                inputProps={{
                  step: "0.01",
                  inputMode: "decimal",
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(pushLinea(linea));
              setLinea(initialState);
              setOpen(false);
            }}
          >
            Agregar
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
