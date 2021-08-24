import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM, POST_ITEM } from "../../graphql/mutation";
import { ITEM_DATA } from "../../graphql/query";
import SelectCategoria from "./SelectCategoria";
import { DropzoneArea } from "material-ui-dropzone";
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

export default function ItemEditDialogIcon({ item = null }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialItemState = { ubicacion: { id: 1 } };
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState(initialItemState);

  const onCompleted = (data) => {
    const updatedMsg = `item actualizado`;
    const addedMsg = `item agregado`;
    enqueueSnackbar(item ? updatedMsg : addedMsg, {
      variant: "success",
    });
    handleClose();
  };

  const onError = (error) => {
    enqueueSnackbar(error.message, {
      variant: "error",
    });
  };

  const [updateItem] = useMutation(UPDATE_ITEM, {
    onCompleted,
    onError,
  });

  const [postItem] = useMutation(POST_ITEM, {
    update(cache, { data: { postItem } }) {
      console.log("postItem:", postItem);
      cache.modify({
        fields: {
          items(existingData = []) {
            const newDataRef = cache.writeFragment({
              data: postItem,
              fragment: ITEM_DATA,
            });
            return existingData?.query
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
    if (e.target.name === "precio" || e.target.name === "precioMin") {
      setNewItem({ ...newItem, [e.target.name]: parseFloat(e.target.value) });
    } else if (e.target.type === "number") {
      setNewItem({ ...newItem, [e.target.name]: parseInt(e.target.value) });
    } else {
      setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }
  };

  const handleOnSubmit = () => {
    item
      ? updateItem({ variables: { id: item.id * 1, ...newItem } })
      : postItem({ variables: { ...newItem } });
  };

  const handleClose = () => {
    setNewItem(initialItemState);
    setOpen(false);
  };

  return (
    <>
      {item ? (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          {item ? (
            <EditIcon color="primary" />
          ) : (
            <AddCircleIcon color="primary" />
          )}
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleClickOpen}>
          {item ? "Editar item" : "Agregar item"}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {item ? "Actualizar Datos" : "Agregar Datos"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => {
                  setNewItem({ ...newItem, images: files });
                }}
              />
            </Grid>
            {[
              {
                name: "marca",
                type: "text",
                xs: 6,
                sm: 3,
              },
              {
                name: "modelo",
                type: "text",
                xs: 6,
                sm: 3,
              },
              {
                name: "sku",
                type: "text",
                xs: 6,
                sm: 3,
              },
              {
                name: "barcode",
                type: "number",
                xs: 6,
                sm: 3,
              },
              {
                name: "qty",
                type: "number",
                xs: 4,
              },
              {
                name: "precio",
                type: "number",
                xs: 4,
              },
              {
                name: "precioMin",
                label: "precio min",
                type: "number",
                xs: 4,
              },
              {
                name: "descripcion",
                type: "text",
                xs: 12,
              },
            ].map(({ name, label, type, xs, sm }) => (
              <Grid item xs={xs} sm={sm}>
                <TextField
                  key={name}
                  autoFocus={name === "marca"}
                  margin="dense"
                  name={name}
                  id={name}
                  label={label ?? name}
                  type={type}
                  fullWidth
                  onChange={handleOnChange}
                  multiline={name === "descripcion"}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <SelectCategoria
                categorias={item?.categorias?.map((e) => e.nombre)}
                setNewItem={setNewItem}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            {item ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
