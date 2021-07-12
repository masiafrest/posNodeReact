import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { POST_CATEGORIA, UPDATE_CATEGORIA } from "../../graphql/mutation";

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

export default function CategoriaEditDialogIcon({ categoria = null }) {
  const initialCategoriaState = {};
  const [open, setOpen] = useState(false);
  const [newCategoria, setNewCategoria] = useState(initialCategoriaState);

  const [updateCategoria, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CATEGORIA);
  const [postCategoria, { loading: postLoading, error: postError }] =
    useMutation(POST_CATEGORIA, {
      update(cache, { data: { postCategoria } }) {
        cache.modify({
          fields: {
            categorias(existingCategorias = []) {
              const newCategoriaRef = cache.writeFragment({
                data: postCategoria,
                fragment: gql`
                  fragment NewCategoria on Categoria {
                    id
                    nombre
                  }
                `,
              });
              return [...existingCategorias, newCategoriaRef];
            },
          },
        });
      },
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (e) => {
    setNewCategoria({ ...newCategoria, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = () => {
    categoria
      ? updateCategoria({
          variables: { id: categoria.id * 1, ...newCategoria },
        })
      : postCategoria({ variables: { ...newCategoria } });
    handleClose();
  };
  const handleClose = () => {
    setNewCategoria(initialCategoriaState);
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        {categoria ? (
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
          {categoria ? "Actualizar Datos" : "Agregar Datos"}
        </DialogTitle>
        <DialogContent>
          <TextField
            key="nombre"
            autoFocus
            margin="dense"
            name="nombre"
            id="nombre"
            label="nombre"
            type="text"
            fullWidth
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            {categoria ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
