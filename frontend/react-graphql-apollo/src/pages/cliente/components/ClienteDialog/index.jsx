import { useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_CLIENTE, UPDATE_CLIENTE } from "../../graphql/mutation";
import { CLIENTE_DATA } from "../../graphql/query";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();
  const initialClienteState = {};
  const [open, setOpen] = useState(false);
  const [newCliente, setNewCliente] = useState(initialClienteState);

  const onCompleted = (data) => {
    const updatedMsg = `cliente actualizado`;
    const addedMsg = `cliente agregado`;
    enqueueSnackbar(cliente ? updatedMsg : addedMsg, {
      variant: "success",
    });
    handleClose();
  };

  const onError = (e) => {
    enqueueSnackbar(e.message, {
      variant: "error",
    });
  };

  const [updateCliente] = useMutation(UPDATE_CLIENTE, { onCompleted, onError });
  const [postCliente] = useMutation(POST_CLIENTE, {
    update(cache, { data: { postCliente } }) {
      cache.modify({
        fields: {
          clientes(existingData = []) {
            const newDataRef = cache.writeFragment({
              data: postCliente,
              fragment: CLIENTE_DATA,
            });
            return existingData.query
              ? [...existingData.query, newDataRef]
              : [newDataRef];
          },
        },
      });
    },
    onCompleted,
    onError,
  });

  const handleClickOpen = (e) => {
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
      {cliente ? (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          {cliente ? (
            <EditIcon color="primary" />
          ) : (
            <AddCircleIcon color="primary" />
          )}
        </IconButton>
      ) : (
        <Button
          variant="contained"
          aria-label={cliente ? "edit" : "agregar"}
          onClick={handleClickOpen}
          startIcon={
            cliente ? (
              <EditIcon color="primary" />
            ) : (
              <AddCircleIcon color="primary" />
            )
          }
        >
          Agregar cliente
        </Button>
      )}
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
            {cliente ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
