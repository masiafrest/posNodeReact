import { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useSnackbar } from "notistack";
//redux
import { useDispatch } from "react-redux";
import { pushLinea, addCliente } from "../../../../redux/features/reciboSlice";

const newLineaFactory = ({
  id,
  precio: { precio, precioMin },
  descripcion,
}) => ({
  id,
  tipo: "venta",
  qty: 1,
  descripcion: descripcion,
  precio,
  precioMin,
});

export default function SearchUi({
  queryName,
  loading,
  data,
  searchTerm,
  setSearchTermDebounced,
}) {
  const [search, setSearch] = useState(searchTerm);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getOptionLabel = (options) => {
    let optionLabel;
    if (queryName === "clientes") {
      const { nombre, telefono, dirrecion } = options;
      optionLabel = `${nombre}`;
      telefono && optionLabel.concat(", ", telefono);
      dirrecion && optionLabel.concat(", ", dirrecion);
      return optionLabel;
    } else if (queryName === "items") {
      const { descripcion, categorias } = options;
      const categoriaStr = categorias.map((cat) => cat.nombre).join(", ");
      optionLabel = `${descripcion.trim()} ${categoriaStr}`;
      return optionLabel;
    }
  };

  const getOptions = () => {
    if (data) {
      return data[queryName].query;
    }
    return [];
  };

  // const updateSearch = (term = "") => {
  //   updateSearchTerm(term);
  //   setTerm(term);
  // };

  const autoCompleteChange = (event, value, reason) => {
    console.log("autoCompleteChange value:", value, reason);
    // this value is a object of the item
    if (reason === "select-option") {
      if (queryName === "items") {
        let newLinea = newLineaFactory(value);
        newLinea.enqueueSnackbar = enqueueSnackbar;
        dispatch(pushLinea(newLinea));
        // updateSearch("");
      } else if (queryName === "clientes") {
        dispatch(
          addCliente({
            reciboTipo: "venta",
            cliente: value,
          })
        );
        enqueueSnackbar(`cliente ${value.nombre} agregado`, {
          variant: "success",
        });
      }
    }
    if (reason === "clear") {
      if (queryName === "clientes") {
        dispatch(
          addCliente({
            reciboTipo: "venta",
            cliente: null,
          })
        );
      }
      // updateSearch();
    }
  };

  return (
    <Autocomplete
      loading={loading}
      options={getOptions()}
      getOptionLabel={getOptionLabel}
      onChange={autoCompleteChange}
      renderInput={(params) => (
        <TextField
          {...params}
          value={search}
          onChange={(e) => {
            const { value } = e.target;
            setSearchTermDebounced(value.toUpperCase());
            setSearch(value.toUpperCase());
          }}
          label={`Buscar ${queryName}`}
        />
      )}
    />
  );
}
