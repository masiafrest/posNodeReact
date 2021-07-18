import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { addClienteId } from "../../../../../redux/features/reciboSlice";
import { useSelector, useDispatch } from "react-redux";
import AddClientBtn from "../../../../cliente/components/ClienteDialog";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
}) {
  const dispath = useDispatch();
  const clientId = useSelector((state) => state.recibo.venta.clienteId);
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
      onChange={(_, v) => {
        dispath(addClienteId({ reciboTipo: "venta", clienteId: v?.id }));
      }}
      value={
        loading
          ? null
          : data?.clientes[data?.clientes.findIndex((e) => e.id === clientId)]
      }
      renderInput={(params) => {
        return (
          <TextField
            label="cliente"
            helperText="selecciona un cliente"
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
