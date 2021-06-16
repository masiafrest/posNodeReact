import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {ITEM_DATA} from '../../item'
import SelectCategoria from './SelectCategoria'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
  Select, MenuItem, Chip, Input, InputLabel
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export default function ItemEditDialogIcon({item}) {
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({})
  const UPDATE_ITEM = gql`
    mutation UpdateItem($id: Int!, $marca: String,
      $modelo: String, $barcode: Int, $sku: String, $qty: Int,
      $descripcion: String,  $precio: Float,
      $precioMin: Float, $categorias: [IdInput]
     ){
      updateItem(id: $id, 
        marca: $marca, modelo: $modelo,
        barcode: $barcode, sku: $sku, qty: $qty, descripcion: $descripcion,
        precio: $precio, precioMin: $precioMin,
        categorias: $categorias
      ){
        ...itemData
      }
    }
        ${ITEM_DATA}
  `

  const [updateItem] = useMutation(UPDATE_ITEM)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (e) => {
     if (e.target.name === 'precio' || e.target.name === 'precioMin'){
    setNewItem({[ e.target.name ]: parseFloat( e.target.value )})
    }
    else {
    setNewItem({[ e.target.name ]: e.target.value})
    }
  }

  const handleOnSubmit = () => {
    console.log('submit....: ', newItem)
    updateItem({variables: {id: item.id*1, ...newItem} })
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Actualizar Datos</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            placeholder={item.marca}
            name='marca'
            id="marca"
            label="marca"
            type="text"
            fullWidth
            onChange={handleOnChange}
          />
          <TextField
            autoFocus
            margin="dense"
            placeholder={item.precio.precio}
            name='precio'
            id="precio"
            label="marca"
            type="number"
            fullWidth
            onChange={handleOnChange}
          />
          <SelectCategoria categorias={item.categorias.map(e=> e.nombre)} setNewItem={setNewItem} />
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
