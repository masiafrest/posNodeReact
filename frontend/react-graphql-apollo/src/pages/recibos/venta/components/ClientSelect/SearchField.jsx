import { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
      options={
        data?.clientes
          ? [...data?.clientes, { isComp: true, nombre: "comp" }]
          : []
      }
      // query loading state
      loading={loading}
      getOptionLabel={(option) => {
        if (option.nombre === "comp") {
          return "agregar cliente";
        }
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
      renderOption={(option) => {
        return option.isComp ? (
          <button onClick={() => console.log("click")}>agregar cliente</button>
        ) : (
          option.nombre
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
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
    />
  );
}
