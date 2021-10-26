import { useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_USUARIO, UPDATE_USUARIO } from "../../graphql/mutation";
import { USUARIO_DATA } from "../../graphql/query";
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
  MenuItem,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function UsuarioEditDialogIcon({ usuario = null }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialUsuarioState = {};
  const [open, setOpen] = useState(false);
  const [newUsuario, setNewUsuario] = useState(initialUsuarioState);
  console.log("newsuaruio: ", newUsuario);

  const onCompleted = (data) => {
    enqueueSnackbar(`usuario ${usuario ? "actualizado" : "agregado"}`, {
      variant: "success",
    });
    handleClose();
  };

  const onError = (e) => {
    enqueueSnackbar(e.message, {
      variant: "error",
    });
  };

  const [updateUsuario] = useMutation(UPDATE_USUARIO, { onCompleted, onError });
  const [postUsuario] = useMutation(POST_USUARIO, {
    update(cache, { data: { postUsuario } }) {
      cache.modify({
        fields: {
          usuarios(existingData = []) {
            const newDataRef = cache.writeFragment({
              data: postUsuario,
              fragment: USUARIO_DATA,
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
    setNewUsuario({
      ...newUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = () => {
    usuario
      ? updateUsuario({ variables: { id: usuario.id * 1, ...newUsuario } })
      : postUsuario({ variables: { ...newUsuario } });
    handleClose();
  };
  const handleClose = () => {
    setNewUsuario(initialUsuarioState);
    setOpen(false);
  };

  return (
    <>
      {usuario ? (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          {usuario ? (
            <EditIcon color="primary" />
          ) : (
            <AddCircleIcon color="primary" />
          )}
        </IconButton>
      ) : (
        <Button
          variant="contained"
          aria-label={usuario ? "edit" : "agregar"}
          onClick={handleClickOpen}
          startIcon={
            usuario ? (
              <EditIcon color="primary" />
            ) : (
              <AddCircleIcon color="primary" />
            )
          }
        >
          Agregar usuario
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {usuario ? "Actualizar Datos" : "Agregar Datos"}
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
                name: "password",
                type: "text",
                xs: 6,
              },
              {
                name: "rol",
                xs: 12,
              },
            ].map(({ name, type, xs }) => (
              <Grid item xs={xs}>
                <TextField
                  placeholder={name === "nombre" && usuario?.nombre}
                  value={newUsuario[name]}
                  key={name}
                  autoFocus={name === "nombre"}
                  margin="dense"
                  name={name}
                  id={name}
                  label={name}
                  type={type}
                  fullWidth
                  select={name === "rol"}
                  onChange={handleOnChange}
                >
                  {name === "rol" &&
                    ["ADMIN", "VENDEDOR"].map((e) => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            {usuario ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
