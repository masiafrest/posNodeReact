import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
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
  const [open, setOpen] = useState(false);
  const [newCliente, setNewCliente] = useState(initialClienteState);

  const [updateCliente, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CLIENTE);
  const [postCliente, { loading: postLoading, error: postError }] = useMutation(
    POST_CLIENTE,
    {
      update(cache, { data: { postCliente } }) {
        cache.modify({
          fields: {
            clientes(existingClientes = []) {
              const newClienteRef = cache.writeFragment({
                data: postCliente,
                fragment: gql`
                  fragment NewCliente on Cliente {
                    id
                    nombre
                    telefono
                    dirrecion
                  }
                `,
              });
              return [...existingClientes, newClienteRef];
            },
          },
        });
      },
    }
  );

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
            {cliente ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
