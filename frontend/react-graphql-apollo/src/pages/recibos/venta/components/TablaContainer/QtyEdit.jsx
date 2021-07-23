import { TextField } from "@material-ui/core";
import { gql, useLazyQuery } from "@apollo/client";

export default function QtyEdit() {
  const [getQty, { loading, data }] = useLazyQuery(gql`
    query getItemById(id: $Int) {
			item(id:$id){
      qty
			}
    }
  `);
  return <TextField id="qtyEdit" name="qty" />;
}
