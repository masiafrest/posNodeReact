import { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { gql, useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { editQty } from "../../../../../../../redux/features/reciboSlice";

export default function QtyEditField({ itemId, qty, idx }) {
  const dispatch = useDispatch();
  const [getQty, { loading, data }] = useLazyQuery(
    gql`
      query getItemById($id: Int!) {
        item(id: $id) {
          qty
        }
      }
    `,
    {
      variables: { id: itemId * 1 },
    }
  );

  useEffect(() => {
    if (itemId) {
      getQty();
    }
  }, [data]);

  const maxQty = data?.item?.qty;
  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(
      editQty({
        idx,
        qty: value > maxQty ? Number(maxQty) : Number(value),
        tipo: "venta",
      })
    );
  };

  if (loading) return "loading";
  return (
    <TextField
      id="qtyEdit"
      name="qty"
      helperText={!itemId && maxQty && `max ${maxQty}`}
      type="number"
      onChange={handleChange}
      value={qty}
      inputProps={{ min: 1, max: maxQty, inputMode: "numeric" }}
    />
  );
}
