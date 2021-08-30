import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM, POST_ITEM } from "../../graphql/mutation";
import { ITEM_DATA } from "../../graphql/query";
import SelectCategoria from "./SelectCategoria";
import { DropzoneArea } from "material-ui-dropzone";
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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { resizeFile, dataURIToFile } from "./resizeUtils";
import { getImgUrls } from "../../../../utils";

export default function ItemEditDialogIcon({ item = null }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialItemState = { ubicacion: { id: 1 } };
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState(initialItemState);

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
      setNewItem({ ...newItem, [e.target.name]: e.target.value.toUpperCase() });
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

  const imgUrls = item ? getImgUrls(item.image_url) : [];

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
                initialFiles={imgUrls}
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={async (files) => {
                  try {
                    let fileBlobResize = [];
                    for (let i = 0; i < files.length; i++) {
                      const image = await resizeFile(files[i]);
                      const newFile = dataURIToFile(image, files[i].name);
                      fileBlobResize.push(newFile);
                    }
                    setNewItem({ ...newItem, images: fileBlobResize });
                  } catch (e) {
                    enqueueSnackbar(e.message, {
                      variant: "error",
                    });
                    console.log(e);
                  }
                }}
              />
            </Grid>
            {[
              {
                name: "descripcion",
                type: "text",
                xs: 12,
              },
              {
                name: "sku",
                type: "text",
                xs: 6,
                sm: 6,
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
