import { useState, useContext } from "react";

import { IsError } from '../../../recibos/venta'
import { useSelector, useDispatch } from "react-redux";

import AddBtn from "../AddBtn";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
  recibo = false
}) {
  const [isError, setIsError] = useContext(IsError);
  const lineas = useSelector(state => state.recibo.venta.lineas)

  console.log('lineas arr', !lineas.length)
  const [term, setTerm] = useState(initialTerm);
  return (
    <Autocomplete
      // data suggestions return from query
      options={data?.items || []}
      loading={loading} // query loading state
      getOptionLabel={(option) => {
        const label = `${option.marca}, ${option.modelo}, ${option.descripcion}`;
        return label;
      }}
      renderOption={(option) => (
        <>
          <span>{option.marca}</span>
          <AddBtn item={option} reciboTipo="venta" />
        </>
      )}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="buscar Item"
            // fullWidth={false}
            value={term} //search term value
            //update search term state on field change
            onChange={(e) => {
              updateSearchTerm(e.target.value);
              setTerm(e.target.value);
              console.log('lineas arr', !lineas.length)
              setIsError(oldValue => oldValue.items = !lineas.length)
            }}
            helperText={isError.items && 'selecciona un item'}
          />
        );
      }}
    />
  );
}
