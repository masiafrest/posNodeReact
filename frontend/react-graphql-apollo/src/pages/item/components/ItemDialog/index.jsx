import React from "react";
import {  useMutation } from "@apollo/client";
import { UPDATE_ITEM, POST_ITEM, GET_CATEGORIAS} from "../../graphql/mutation";
import SelectCategoria from './SelectCategoria'

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

export default function ItemEditDialogIcon({item = null}) {
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({})
  console.log(newItem)

  const [updateItem] = useMutation(UPDATE_ITEM)
  const [postItem] = useMutation(POST_ITEM);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (e) => {
     if (e.target.name === 'precio' || e.target.name === 'precioMin'){
    setNewItem({...newItem, [ e.target.name ]: parseFloat( e.target.value )})
    }
    else {
    setNewItem({...newItem,[ e.target.name ]: e.target.value})
    }
  }

  const handleOnSubmit = () => {
    console.log('submit....: ', newItem)
    item ? updateItem({variables: {id: item.id*1, ...newItem} })
    : postItem({ variables: { ...newItem } });
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        {
          item ?
        <EditIcon color="primary" />
           :
        <AddCircleIcon color="primary" />
        }
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
            placeholder={item?.marca}
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
            placeholder={item?.precio.precio}
            name='precio'
            id="precio"
            label="precio"
            type="number"
            fullWidth
            onChange={handleOnChange}
          />
          <SelectCategoria categorias={item?.categorias.map(e=> e.nombre)} setNewItem={setNewItem} />
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
