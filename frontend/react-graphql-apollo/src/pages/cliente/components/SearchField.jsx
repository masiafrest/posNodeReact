import { useState, useContext } from "react";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { addCliente } from "../../../redux/features/reciboSlice";
import { useDispatch } from "react-redux";
import AddClientBtn from "./ClienteDialog";

import { useSnackbar } from "notistack";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
  recibo = false,
  context,
}) {
  const Context = useContext(context);
  let shouldSubmit, setShouldSubmit;
  if (recibo) {
    ({
      shouldSubmit: [shouldSubmit, setShouldSubmit],
    } = Context);
  }
  const dispath = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [term, setTerm] = useState(initialTerm);

  const updateSearch = (term = "") => {
    updateSearchTerm(term);
    setTerm(term);
  };

  const handleChange = (_, v, r) => {
    if (r === "select-option") {
      if (recibo) {
        dispath(addCliente({ reciboTipo: "venta", clienteId: v?.id }));
        setShouldSubmit({
          ...shouldSubmit,
          //cliente has id, is selected so false, to disable helpertext
          cliente: {
            ...v,
            error: false,
            selected: true,
          },
        });
        enqueueSnackbar(`cliente ${v.nombre} agregado`, {
          variant: "success",
        });
        updateSearch();
      } else {
        const selected = `${v.nombre} ${v.telefono} ${v.dirrecion}`;
        updateSearch(selected);
      }
    }
    if (r === "clear") {
      if (recibo) {
        dispath(addCliente({ reciboTipo: "venta", clienteId: null }));
        setShouldSubmit({
          ...shouldSubmit,
          //cliente has id, is selected so false, to disable helpertext
          cliente: {
            error: false,
            selected: false,
          },
        });
        enqueueSnackbar(`cliente borrado`, {
          variant: "warning",
        });
      }
      updateSearch();
    }
  };

  return (
    <Autocomplete
      options={data}
      loading={loading}
      debug
      noOptionsText={<AddClientBtn />}
      onChange={handleChange}
      getOptionLabel={(o) => {
        const { nombre, telefono, dirrecion } = o;
        let optionLabel = `${nombre}`;
        telefono && optionLabel.concat(", ", telefono);
        dirrecion && optionLabel.concat(", ", dirrecion);
        return optionLabel;
      }}
      inputValue={term}
      onInputChange={(e, value) => {
        updateSearchTerm(value.toUpperCase());
        setTerm(value.toUpperCase());
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label="Buscar cliente"
            helperText={
              recibo &&
              (shouldSubmit.cliente.selected || "selecciona un cliente")
            }
          />
        );
      }}
    />
  );
}
