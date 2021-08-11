import { useState, useContext } from "react";
import { ShouldSubmit } from "../ReciboVenta";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addClienteId } from "../../../../../../../redux/features/reciboSlice";
import { useDispatch } from "react-redux";
import AddClientBtn from "../../../../../../cliente/components/ClienteDialog";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
}) {
  const [shouldSubmit, setShouldSubmit] = useContext(ShouldSubmit);
  const dispath = useDispatch();
  const [term, setTerm] = useState(initialTerm);
  return (
    <Autocomplete
      // data suggestions return from query
      options={data?.clientes || []}
      // query loading state
      loading={loading}
      getOptionLabel={(option) => {
        return `${option.nombre} ${option.telefono}`;
      }}
      onChange={(_, v, r) => {
        if (r === "select-option") {
          dispath(addClienteId({ reciboTipo: "venta", clienteId: v?.id }));
          setShouldSubmit({
            ...shouldSubmit,
            //cliente has id, is selected so false, to disable helpertext
            cliente: {
              ...v,
              error: false,
              selected: true,
            },
          });
        } else if (r === "clear") {
          dispath(addClienteId({ reciboTipo: "venta", clienteId: null }));
          setShouldSubmit({
            ...shouldSubmit,
            //cliente has id, is selected so false, to disable helpertext
            cliente: {
              error: false,
              selected: false,
            },
          });
        }
      }}
      value={
        loading
          ? null
          : data?.clientes[
              data?.clientes.findIndex((e) => e.id === shouldSubmit.cliente.id)
            ]
      }
      renderInput={(params) => {
        return (
          <TextField
            label="cliente"
            helperText={
              shouldSubmit.cliente.selected || "selecciona un cliente"
            }
            {...params}
            // fullWidth={false}
            //search term value
            value={term}
            onChange={(e) => {
              updateSearchTerm(e.target.value);
              setTerm(e.target.value);
            }}
          />
        );
      }}
      debug={true}
      noOptionsText={<AddClientBtn />}
    />
  );
}
