import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { pushLinea } from '../../../../redux/features/reciboSlice'
import AddBtn, { addLinea } from "../AddBtn";
import { useSnackbar } from "notistack";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchField({
  data,
  loading,
  initialTerm,
  updateSearchTerm,
  recibo = false,
}) {
  const dispatch = useDispatch()
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  const { enqueueSnackbar } = useSnackbar();
  const [term, setTerm] = useState(initialTerm);
  return (
    <Autocomplete
      // data suggestions return from query
      options={data?.items || []}
      loading={loading} // query loading state
      onChange={(event, value, reason) => {
        if (reason === 'select-option') {
          addLinea(dispatch, pushLinea, enqueueSnackbar, value, lineas, 'venta'
          )
        }
        console.log('event top value', value)
        console.log('event top reason', reason)
        if (reason === 'clear') {
          updateSearchTerm('');
          setTerm('');
        }
      }}
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
            onChange={(e, v, r) => {
              console.log('event', e)
              updateSearchTerm(e.target.value);
              setTerm(e.target.value);
            }}
          />
        );
      }}
    />
  );
}
