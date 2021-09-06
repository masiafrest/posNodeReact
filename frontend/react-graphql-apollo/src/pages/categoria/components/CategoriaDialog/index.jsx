import { useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_CATEGORIA, UPDATE_CATEGORIA } from "../../graphql/mutation";
import { CATEGORIAS_DATA } from "../../graphql/query";
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

export default function CategoriaEditDialogIcon({ categoria = null }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialCategoriaState = {};
  const [open, setOpen] = useState(false);
  const [newCategoria, setNewCategoria] = useState(initialCategoriaState);

  const onCompleted = (data) => {
    enqueueSnackbar(`categoria ${categoria ? "actualizado" : "agregado"}`, {
      variant: "success",
    });
    handleClose();
  };

  const onError = (e) => {
    enqueueSnackbar(e.message, {
      variant: "error",
    });
  };

  const [updateCategoria] = useMutation(UPDATE_CATEGORIA, {
    onCompleted,
    onError,
  });
  const [postCategoria] = useMutation(POST_CATEGORIA, {
    update(cache, { data: { postCategoria } }) {
      cache.modify({
        fields: {
          categorias(existingData = []) {
            const newDataRef = cache.writeFragment({
              data: postCategoria,
              fragment: CATEGORIAS_DATA,
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (e) => {
    setNewCategoria({
      ...newCategoria,
      [e.target.name]: e.target.value.toUpperCase(),
    });
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
      {categoria ? (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          {categoria ? (
            <EditIcon color="primary" />
          ) : (
            <AddCircleIcon color="primary" />
          )}
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleClickOpen}>
          {categoria ? "Editar categoria" : "Agregar categoria"}
        </Button>
      )}
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
            value={newCategoria.nombre}
            placeholder={categoria?.nombre}
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
