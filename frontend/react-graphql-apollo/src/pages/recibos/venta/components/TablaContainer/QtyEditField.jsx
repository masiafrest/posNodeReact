import { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { editQty } from "../../../../../redux/features/reciboSlice";

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
    getQty()
  }, [])

  const handleChange = (e) => {
      dispatch(
        editQty({
          idx,
          qty: e.target.value,
          tipo: "venta",
        })
      );
    getQty();
  };

  if (loading) return "loading";
  return (
    <TextField
      id="qtyEdit"
      name="qty"
      helperText={data?.item.qty && `max ${ data?.item.qty }`}
      type="number"
      onChange={handleChange}
      value={qty}
      inputProps={{min:0, max:data?.item.qty}}
    />
  );
}
