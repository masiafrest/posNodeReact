import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { editPrice } from "../../../../../../../redux/features/reciboSlice";

export default function PriceEditField({ itemId, precio, precioMin, idx }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(
      editPrice({
        idx,
        price: Number(value),
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
      inputProps={{ step: "0.01", min: precioMin }}
    />
  );
}
