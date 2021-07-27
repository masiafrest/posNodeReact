import { TextField } from "@material-ui/core";
// import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { editPrice } from "../../../../../redux/features/reciboSlice";
import { useContext } from "react";
import { IsError } from "../..";

export default function PriceEditField({ itemId, precio, precioMin, idx }) {
  const [isPriceError, setIsPriceError] = useContext(IsError);
  const dispatch = useDispatch();
  // const [getPrice, { loading, data }] = useLazyQuery(
  //   gql`
  //     query getItemById($id: Int!) {
  //       item(id: $id) {
  //         precio {
  //           precio
  //           precioMin
  //         }
  //       }
  //     }
  //   `,
  //   {
  //     variables: { id: itemId * 1 },
  //   }
  // );

  const handleChange = (e) => {
    if (e.target.value >= precioMin) {
      setIsPriceError({
        ...isPriceError,
        [idx]: false,
      });
      dispatch(
        editPrice({
          idx,
          precio: e.target.value,
          tipo: "venta",
        })
      );
    } else {
      setIsPriceError({
        ...isPriceError,
        [idx]: true,
      });
    }
  };

  return (
    <TextField
      id="priceEdit"
      name="price"
      error={isPriceError[idx]}
      helperText={isPriceError[idx] ? `min ${precioMin}` : false}
      type="number"
      onChange={handleChange}
      value={precio}
    />
  );
}
