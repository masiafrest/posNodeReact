import { TextField } from "@material-ui/core";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { editQty } from "../../../../../redux/features/reciboSlice";
import { useState, useContext } from "react";
import { QtyError } from "../../../venta";

export default function QtyEdit({ itemId, qty, idx }) {
  const [isQtyError, setIsQtyError] = useContext(QtyError);
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

  const handleChange = (e) => {
    if (e.target.value <= data?.item.qty) {
      setIsQtyError({
        ...isQtyError,
        [idx]: false,
      });
      dispatch(
        editQty({
          idx,
          qty: e.target.value,
          tipo: "venta",
        })
      );
    } else {
      setIsQtyError({
        ...isQtyError,
        [idx]: true,
      });
    }
    getQty();
    console.log("handleChage");
  };

  if (loading) return "loading";
  console.log("data", data);
  return (
    <TextField
      id="qtyEdit"
      name="qty"
      error={isQtyError[idx]}
      helperText={isQtyError[idx] ? `max ${data?.item.qty}` : false}
      type="number"
      onChange={handleChange}
      value={qty}
    />
  );
}
