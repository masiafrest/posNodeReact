import { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addClienteId } from "../../../../../redux/features/reciboSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
}) {
  const dispath = useDispatch();
  const clientId = useSelector((state) => state.recibo.venta.clienteId);
  console.log("clientId", clientId);
  const [term, setTerm] = useState(initialTerm);
  console.log("term", term);
  return (
    <Autocomplete
      // data suggestions return from query
      options={data?.clientes || []}
      loading={loading} // query loading state
      getOptionLabel={(option) => {
        const label = `${option.nombre} ${option.telefono}`;
        return label;
      }}
      getOptionSelected={(o) => o.id === clientId}
      onChange={(_, v) => {
        console.log("onchange autocomplete: ", v?.id);
        dispath(addClienteId({ reciboTipo: "venta", clienteId: v?.id }));
      }}
      // value={loading ? null : data?.clientes[0]}
      renderOption={(option) => <span>{option.nombre}</span>}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            // fullWidth={false}
            //search term value
            value={term}
            onChange={(e, v, a) => {
              console.log("onchange: ", a);
              console.log("onchange: ", v);
              console.log("onchange: ", e.target.value);
              updateSearchTerm(e.target.value);
              setTerm(e.target.value);
            }}
          />
        );
      }}
    />
  );
}
