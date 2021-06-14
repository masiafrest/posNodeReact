import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

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
  const [newItem, setNewItem] = React.useState({
    marca: '', modelo: '',
    categorias: item.categorias
  })
  const UPDATE_ITEM = gql`
    mutation UpdateItem($id: Int!, $marca: String,
      $modelo: String, $barcode: Int, $sku: String, $qty: Int,
      $descripcion: String,  $precio: Float,
      $precioMin: Float, $categorias: [IdInput]
     ){
      updateItem(id: $id, data: {
        marca: $marca, modelo: $modelo,
        barcode: $barcode, sku: $sku, qty: $qty, descripcion: $descripcion,
        precio: $precio, precioMin: $precioMin,
        categorias: $categorias
      }){
        id marca 
      }
    }
  `
  const GET_CATEGORIAS = gql`{
    categorias{
      id nombre
    }
  }
  `
  const {data, loading, error} = useQuery(GET_CATEGORIAS)

  const [updateItem] = useMutation(UPDATE_ITEM)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (e) => {
    if (e.target.name ==='categorias'){
      console.log('.......', e.target)
      setNewItem( { categorias: e.target.value })
    }
    setNewItem({[ e.target.name ]: e.target.value})
  }

  const handleOnSubmit = () => {
    console.log('submit....: ', newItem)
    // updateItem({variables: { id: item.id*1, ...item} })
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
            name='marca'
            id="marca"
            label="marca"
            type="text"
            fullWidth
            onChange={handleOnChange}
          />
          <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
          <Select
          style={{width: 300}}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          value={item.categorias}
          multiple
          name='categorias'
          onChange={handleOnChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div>
              {selected.map((categoria) => (
                <Chip key={categoria.id} label={categoria.nombre} />
              ))}
            </div>
          )}
          MenuProps={{
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
}}
        >
          {
            loading ? <MenuItem>loading</MenuItem> :
          data.categorias.map((cat, idx, arr) => (
            <MenuItem key={cat.nombre} value={arr[idx]} >
              {cat.nombre}
            </MenuItem>
          ))}
        </Select>

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
