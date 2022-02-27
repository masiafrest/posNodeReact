import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM, POST_ITEM } from "../../graphql/mutation";
import { ITEM_DATA } from "../../graphql/query";
import { modifyCacheOnPost } from "../../../../utils/apollo";
// import SelectInput from "./SelectInput";
import { GET_CATEGORIAS } from "../../../categoria/graphql/query";
import { GET_MODELOS } from "../../graphql/query";
import { GET_CARACTERISTICAS } from "../../graphql/query";
import { GET_MARCAS } from "../../graphql/query";
import { GET_COLORS } from "../../graphql/query";
import SelectInput from "../../../../components/SelectInput";

import { useSnackbar } from "notistack";
import useToggle from "../../../../utils/hooks/useToggle";

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

import CollapseDropzone from "./CollapseDropzone";

export default function ItemEditDialogIcon({ item = null }) {
  const initialItemState = {
    ubicacion: { id: 1 },
    categorias: [],
    caracteristicas: [],
    modelos: [],
    marca: "",
    color: "",
  };
  const { enqueueSnackbar } = useSnackbar();
  const [open, toggleOpen] = useToggle();
  const [newItem, setNewItem] = useState(initialItemState);
  if (item) {
    initialItemState.categorias.push(...item?.categorias.map((e) => e.nombre));
    initialItemState.caracteristicas.push(
      ...item?.caracteristicas.map((e) => e.nombre)
    );
    initialItemState.modelos.push(...item?.modelos.map((e) => e.nombre));
    initialItemState.marca = item?.marca?.nombre;
    initialItemState.color = item?.color?.nombre;
  }

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
    // refetchQueries: [GET_ITEMS],
    update(cache, { data: { postItem } }) {
      modifyCacheOnPost(cache, postItem, ITEM_DATA, "items");
    },
    onCompleted,
    onError,
  });

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
    toggleOpen();
  };

  return (
    <>
      {item ? (
        <IconButton aria-label="edit" onClick={toggleOpen}>
          {item ? (
            <EditIcon color="primary" />
          ) : (
            <AddCircleIcon color="primary" />
          )}
        </IconButton>
      ) : (
        <Button variant="contained" onClick={toggleOpen}>
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
                GET_QUERY={GET_MODELOS}
                defaultValue={newItem.modelos}
                setDefaultValue={setNewItem}
                multiple={true}
              />
              <SelectInput
                type="categorias"
                GET_QUERY={GET_CATEGORIAS}
                defaultValue={newItem.categorias}
                setDefaultValue={setNewItem}
                multiple={true}
              />
              <SelectInput
                type="caracteristicas"
                GET_QUERY={GET_CARACTERISTICAS}
                defaultValue={newItem.caracteristicas}
                setDefaultValue={setNewItem}
                multiple={true}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectInput
                type="marcas"
                GET_QUERY={GET_MARCAS}
                defaultValue={newItem.marca}
                setDefaultValue={setNewItem}
              />
              <SelectInput
                type="colors"
                GET_QUERY={GET_COLORS}
                defaultValue={newItem.color}
                setDefaultValue={setNewItem}
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
