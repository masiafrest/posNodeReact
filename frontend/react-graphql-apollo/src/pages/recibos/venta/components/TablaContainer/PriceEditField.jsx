import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { editPrice } from "../../../../../redux/features/reciboSlice";
import { useContext } from "react";
import { IsError } from "../..";

export default function PriceEditField({ itemId, precio, precioMin, idx }) {
  const [isError, setIsError] = useContext(IsError);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setIsError(
      oldValue => {
        oldValue.precio[idx] = e.target.value < precioMin;
        return oldValue
      }
    );
    if (e.target.value >= precioMin) {
      dispatch(
        editPrice({
          idx,
          precio: e.target.value,
          tipo: "venta",
        })
      );
    } else {
      dispatch(
        editPrice({
          idx,
          precio: precioMin,
          tipo: "venta",
        })
      );
    }
  };

  return (
    <TextField
      id="priceEdit"
      name="price"
      error={isError.precio[idx]}
      helperText={isError.precio[idx] ? `min ${precioMin}` : false}
      type="number"
      onChange={handleChange}
      value={precio}
      inputProps={{step:'0.01', min:precioMin}}
    />
  );
}
