import { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useSnackbar } from "notistack";
//redux
import { useSelector, useDispatch } from "react-redux";
import { pushLinea, addCliente } from "../../../../redux/features/reciboSlice";

const newLineaFactory = ({
  id,
  precio: { precio, precioMin },
  descripcion,
  categorias,
}) => ({
  id,
  tipo: "venta",
  qty: 1,
  descripcion: `${descripcion} | ${categorias.map((e) => e.nombre).join(", ")}`,
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
  const venta = useSelector((state) => state.recibo.venta);

  const { enqueueSnackbar } = useSnackbar();

  const getOptionLabel = (options) => {
    let optionLabel;
    if (queryName === "clientes") {
      console.log("getoptionlabel ", options);
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
    // this value is a object of the item
    if (reason === "select-option") {
      console.log("select-option");
      if (queryName === "items") {
        console.log("items");
        let newLinea = newLineaFactory(value);
        newLinea.enqueueSnackbar = enqueueSnackbar;
        dispatch(pushLinea(newLinea));
        // updateSearch("");
      } else if (queryName === "clientes") {
        console.log("clientes");
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
      console.log("clientes");
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
            console.log("onChage value", value);
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
