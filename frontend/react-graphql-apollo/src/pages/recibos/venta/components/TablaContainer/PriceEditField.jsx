import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { editPrice } from "../../../../../redux/features/reciboSlice";
import { useContext } from "react";
import { IsError } from "../..";

export default function PriceEditField({ itemId, precio, precioMin, idx }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value
    console.log(typeof value, value)
    dispatch(
      editPrice({
        idx,
        price: value >= precioMin ? value : precioMin,
        tipo: "venta",
      })
    );
  };

  return (
    <TextField
      id="priceEdit"
      name="price"
      helperText={`min ${precioMin}`}
      type="number"
      onChange={handleChange}
      value={precio}
      inputProps={{ step: '0.01', min: precioMin }}
    />
  );
}
