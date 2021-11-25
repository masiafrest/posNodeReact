import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM, POST_ITEM } from "../../graphql/mutation";
import { ITEM_DATA } from "../../graphql/query";
import SelectCategoria from "./SelectCategoria";
import { useSnackbar } from "notistack";
import CreateCat from "../../../categoria/components/CategoriaDialog";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
  Grid,
  Collapse,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import CollapseDropzone from "./CollapseDropzone";

export default function ItemEditDialogIcon({ item = null }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialItemState = { ubicacion: { id: 1 } };
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState(initialItemState);

  const onCompleted = (data) => {
    const mutation = item ? "updateItem" : "postItem";
    const { descripcion } = data[mutation];
    enqueueSnackbar(
      `item ${descripcion} ${item ? "actualizado" : "agregado"}`,
      {
        variant: "success",
      }
    );
    handleClose();
  };

  const onError = (error) => {
    console.log(error);
    enqueueSnackbar(error.message, {
      variant: "error",
    });
  };

  const [updateItem] = useMutation(UPDATE_ITEM, {
    onCompleted,
    onError,
  });

  const [postItem] = useMutation(POST_ITEM, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          items(existingData = []) {
            const newDataRef = cache.writeFragment({
              data: data.postItem,
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
    const { name, value, type } = e.target;
    if (name === "precio" || name === "precioMin") {
      setNewItem({ ...newItem, [name]: parseFloat(value) });
    } else if (type === "number") {
      setNewItem({ ...newItem, [name]: parseInt(value) });
    } else {
      setNewItem({ ...newItem, [name]: value.toUpperCase() });
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
          {item ? `Actualizar Datos de ${item.descripcion}` : "Agregar Datos"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CollapseDropzone
                image_url={item?.image_url ? item.image_url : ""}
                newItemState={[newItem, setNewItem]}
                queueSnackbar={enqueueSnackbar}
              />
            </Grid>
            {[
              {
                name: "descripcion",
                type: "text",
                xs: 12,
              },
              {
                name: "barcode",
                type: "number",
                xs: 6,
                sm: 6,
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
            ].map(({ name, label, type, xs, sm }) => {
              return (
                <Grid item xs={xs} sm={sm} key={"grid-" + name}>
                  <TextField
                    helperText={
                      item &&
                      (name === "precio" || name === "precioMin"
                        ? item.precio[name]
                        : item[name])
                    }
                    placeholder={
                      item &&
                      (name === "precio" || name === "precioMin"
                        ? item.precio[name]
                        : item[name])
                    }
                    value={newItem[name]}
                    key={name}
                    autoFocus={name === "descripcion"}
                    margin="dense"
                    name={name}
                    id={name}
                    label={label ?? name}
                    type={type}
                    fullWidth
                    onChange={handleOnChange}
                    multiline={name === "descripcion"}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                </Grid>
              );
            })}
            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              alignContent="center"
            >
              <Grid item xs={6}>
                <SelectCategoria
                  categorias={item?.categorias?.map((e) => e.nombre)}
                  setNewItem={setNewItem}
                />
              </Grid>
              <Grid item xs={6}>
                <CreateCat />
              </Grid>
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
