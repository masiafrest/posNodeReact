import { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useSnackbar } from "notistack";

import addLinea from "../../../../components/addLineaItem";
import getDescription from "../../../../components/getDescription";
//redux
import { useSelector, useDispatch } from "react-redux";
import { pushLinea, addCliente } from "../../../../redux/features/reciboSlice";

export default function SearchUi({
  queryName,
  loading,
  data,
  searchTerm,
  setSearchTermDebounced,
}) {
  const [search, setSearch] = useState(searchTerm);

  const dispatch = useDispatch();
  const venta = useSelector((state) => state.recibo.venta);

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
      const { marca, modelos, color, caracteristicas, categorias } = options;
      optionLabel = `${getDescription(
        marca,
        modelos,
        color,
        caracteristicas,
        categorias
      )} `;
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
    // this value is a object of the item
    if (reason === "select-option") {
      if (queryName === "items") {
        addLinea(dispatch, pushLinea, value);
        // updateSearch("");
      } else if (queryName === "clientes") {
        const { nombre } = value;
        dispatch(
          addCliente({
            reciboTipo: "venta",
            cliente: nombre,
          })
        );
        enqueueSnackbar(`cliente ${nombre} agregado`, {
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

  const isError = () => {
    if (queryName === "items") {
      return venta.lineas.length === 0;
    } else if (queryName === "clientes") {
      return !Boolean(venta.cliente);
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
          // value={search}
          onChange={(e) => {
            const { value } = e.target;
            setSearchTermDebounced(value.toUpperCase());
            setSearch(value.toUpperCase());
          }}
          label={`Buscar ${queryName}`}
          error={isError()}
          helperText={
            isError() ? `Agregue un ${queryName} para poder guardar` : null
          }
          variant="outlined"
        />
      )}
    />
  );
}
