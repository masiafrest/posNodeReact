import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { pushLinea } from "../../../redux/features/reciboSlice";
import AddBtn, { addLinea } from "./AddBtn";

import { useSnackbar } from "notistack";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import AddItemBtn from "./ItemDialog";

export default function SearchItem({
  initialTerm,
  updateSearchTerm,
  recibo = false,
}) {
  const dispatch = useDispatch();
  const lineas = useSelector((state) => state.recibo.venta.lineas);
  const { enqueueSnackbar } = useSnackbar();
  const [term, setTerm] = useState(initialTerm);
  const updateSearch = (term = "") => {
    updateSearchTerm(term);
    setTerm(term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <>
      <TextField value={term} onChange={handleChange} />
      <IconButton onClick={() => updateSearchTerm(term)}>
        <SearchIcon />
      </IconButton>
    </>
  );
}
