import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ITEM_DATA } from "..";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  Chip,
  Input,
  InputLabel,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function ItemCreateDialogIcon() {
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({});
  const POST_ITEM = gql`
    mutation PostItem(
      $marca: String
      $modelo: String
      $barcode: Int
      $sku: String
      $qty: Int
      $descripcion: String
      $precio: Float
      $precioMin: Float
      $categorias: [IdInput]
    ) {
      postItem(
        marca: $marca
        modelo: $modelo
        barcode: $barcode
        sku: $sku
        qty: $qty
        descripcion: $descripcion
        precio: $precio
        precioMin: $precioMin
        categorias: $categorias
      ) {
        ...itemData
      }
    }
    ${ITEM_DATA}
  `;
  const GET_CATEGORIAS = gql`
    {
      categorias {
        id
        nombre
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_CATEGORIAS);

  const [postItem] = useMutation(POST_ITEM);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "categorias") {
      console.log(".......", e.target);
      setNewItem({ categorias: e.target.value });
    } else if (e.target.name === "precio" || e.target.name === "precioMin") {
      setNewItem({ [e.target.name]: parseFloat(e.target.value) });
    } else {
      setNewItem({ [e.target.name]: e.target.value });
    }
  };

  const handleOnSubmit = () => {
    console.log("submit....: ", newItem);
    console.log(typeof newItem.precio);
    postItem({ variables: { ...newItem } });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <AddCircleIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Crear Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="marca"
            id="marca"
            label="marca"
            type="text"
            fullWidth
            onChange={handleOnChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="precio"
            id="precio"
            label="marca"
            type="number"
            fullWidth
            onChange={handleOnChange}
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
