import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM, POST_ITEM } from "../../graphql/mutation";
import { ITEM_DATA } from "../../graphql/query";
import SelectInput from "./SelectInput";
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
  Collapse,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import CollapseDropzone from "./CollapseDropzone";

export default function ItemEditDialogIcon({ item = null }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialItemState = {
    ubicacion: { id: 1 },
    categorias: [],
    caracteristicas: [],
    modelos: [],
    marca: "",
    color: "",
  };
  if (item) {
    console.log("item", item.marca);
    initialItemState.categorias.push(...item?.categorias.map((e) => e.nombre));
    initialItemState.caracteristicas.push(
      ...item?.caracteristicas.map((e) => e.nombre)
    );
    initialItemState.modelos.push(...item?.modelos.map((e) => e.nombre));
    initialItemState.marca = item?.marca?.nombre;
    initialItemState.color = item?.color?.nombre;
  }

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
              //{
              //  name: "marca",
              // type: "text",
              //xs:6,
              //helperText: item?.marca.nombre,
              //placeholder: item?.marca.nombre
              //},
              //{
              // name: "color",
              //type: "text",
              //  xs: 6,
              //  helperText: item?.color.nombre,
              //  placeholder: item?.color.nombre
              //},
              // {
              //   name: "descripcion",
              //   type: "text",
              //   xs: 12,
              //   helperText: item?.descripcion,
              //   placeholder: item?.descripcion
              // },
              {
                name: "barcode",
                type: "number",
                xs: 6,
                sm: 6,
                helperText: item?.barcode,
                placeholder: item?.barcode,
              },
              {
                name: "qty",
                type: "number",
                xs: 4,
                helperText: item?.qty,
                placeholder: item?.qty,
              },
              {
                name: "precio",
                type: "number",
                xs: 4,
                helperText: item?.precio.precio,
                placeholder: item?.precio.precio,
              },
              {
                name: "precioMin",
                label: "precio min",
                type: "number",
                xs: 4,
                helperText: item?.precio.precioMin,
                placeholder: item?.precio.precioMin,
              },
            ].map(({ name, label, type, xs, sm, helperText, placeholder }) => {
              return (
                <Grid item xs={xs} sm={sm} key={"grid-" + name}>
                  <TextField
                    helperText={helperText}
                    placeholder={placeholder}
                    value={newItem[name]}
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
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <SelectInput
                type="modelos"
                multiple={true}
                defaultValue={newItem.modelos}
                setNewItem={setNewItem}
              />
              <SelectInput
                type="categorias"
                multiple={true}
                defaultValue={newItem.categorias}
                setNewItem={setNewItem}
              />
              <SelectInput
                type="caracteristicas"
                multiple={true}
                defaultValue={newItem.caracteristicas}
                setNewItem={setNewItem}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectInput
                type="marcas"
                defaultValue={newItem.marca}
                setNewItem={setNewItem}
              />
              <SelectInput
                type="colors"
                defaultValue={newItem.color}
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
