import React from "react";
import { useMutation } from "@apollo/client";
import { POST_CLIENTE, UPDATE_CLIENTE } from "../../graphql/mutation";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function ClienteEditDialogIcon({ cliente = null }) {
  const initialClienteState = {};
  const [open, setOpen] = React.useState(false);
  const [newCliente, setNewCliente] = React.useState(initialClienteState);
  console.log(newCliente);

  const [updateCliente] = useMutation(UPDATE_CLIENTE);
  const [postCliente] = useMutation(POST_CLIENTE);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (e) => {
    setNewCliente({ ...newCliente, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = () => {
    cliente
      ? updateCliente({ variables: { id: cliente.id * 1, ...newCliente } })
      : postCliente({ variables: { ...newCliente } });
    handleClose();
  };

  const handleClose = () => {
    setNewCliente(initialClienteState);
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        {cliente ? (
          <EditIcon color="primary" />
        ) : (
          <AddCircleIcon color="primary" />
        )}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {cliente ? "Actualizar Datos" : "Agregar Datos"}
        </DialogTitle>
        <DialogContent>
          {[
            {
              name: "nombre",
              type: "text",
            },
            {
              name: "telefono",
              type: "text",
            },
            {
              name: "dirrecion",
              type: "text",
            },
          ].map((field) => (
            <TextField
              key={field.name}
              autoFocus
              margin="dense"
              name={field.name}
              id={field.name}
              label={field.name}
              type={field.type}
              fullWidth
              onChange={handleOnChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
