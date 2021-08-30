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
  Grid,
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
    setNewCliente({
      ...newCliente,
      [e.target.name]: e.target.value.toUpperCase(),
    });
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
          <Grid container spacing={1}>
            {[
              {
                name: "nombre",
                type: "text",
                xs: 6,
              },
              {
                name: "telefono",
                type: "text",
                xs: 6,
              },
              {
                name: "dirrecion",
                type: "text",
                xs: 12,
              },
            ].map(({ name, type, xs }) => (
              <Grid item xs={xs}>
                <TextField
                  value={newCliente[name]}
                  key={name}
                  autoFocus
                  margin="dense"
                  name={name}
                  id={name}
                  label={name}
                  type={type}
                  fullWidth
                  onChange={handleOnChange}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            {cliente ? "Actualizar" : "Agregar"}
          </Button>
          <Button onClick={() => console.log(newCliente)} color="primary">
            console.log
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
