import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM, POST_ITEM } from "../../graphql/mutation";
import { ITEM_DATA } from "../../graphql/query";
import SelectCategoria from "./SelectCategoria";
import { DropzoneArea } from "material-ui-dropzone";

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

export default function ItemEditDialogIcon({ item = null }) {
  const initialItemState = { ubicacion: { id: 1 } };
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState(initialItemState);

  const [updateItem] = useMutation(UPDATE_ITEM);
  const [postItem] = useMutation(POST_ITEM, {
    update(cache, { data: { postItem } }) {
      cache.modify({
        fields: {
          items(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: postItem,
              fragment: ITEM_DATA,
            });
            return [...existingItems, newItemRef];
          },
        },
      });
    },
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
    handleClose();
  };

  const handleClose = () => {
    setNewItem(initialItemState);
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        {item ? (
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
          {item ? "Actualizar Datos" : "Agregar Datos"}
        </DialogTitle>
        <DialogContent>
          <DropzoneArea />
          {[
            {
              name: "marca",
              type: "text",
            },
            {
              name: "modelo",
              type: "text",
            },
            {
              name: "barcode",
              type: "number",
            },
            {
              name: "sku",
              type: "text",
            },
            {
              name: "qty",
              type: "number",
            },
            {
              name: "precio",
              type: "number",
            },
            {
              name: "precioMin",
              label: "precio min",
              type: "number",
            },
            {
              name: "descripcion",
              type: "text",
            },
          ].map((field) => (
            <TextField
              key={field.name}
              autoFocus
              margin="dense"
              name={field.name}
              id={field.name}
              label={field.label ?? field.name}
              type={field.type}
              fullWidth
              onChange={handleOnChange}
              multiline={field.name === "descripcion"}
            />
          ))}
          <SelectCategoria
            categorias={item?.categorias?.map((e) => e.nombre)}
            setNewItem={setNewItem}
          />
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
