import { useMutation } from "@apollo/client";
import { DelVenta } from "../grapql/mutation";

import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSnackbar } from "notistack";

export default function DelBtn({ id }) {
  const { enqueueSnackbar } = useSnackbar();

  const [delVenta, { loading, error }] = useMutation(DelVenta, {
    update(cache, { data: { delVenta } }) {
      cache.modify({
        fields: {
          ventas(existingVentas = [], { readField }) {
            const filteredVentas = existingVentas.query.filter((ventaRef) => {
              return id !== readField("id", ventaRef);
            });
            return filteredVentas;
          },
        },
      });
    },
    onCompleted(data) {
      const { id } = data.delVenta;
      enqueueSnackbar(`Venta ${id} eliminado`, {
        variant: "success",
      });
    },
    onError(e) {
      console.log(e.message);
      enqueueSnackbar(e.message, {
        variant: "warning",
      });
    },
  });

  return (
    <IconButton
      disabled={loading}
      onClick={() => delVenta({ variables: { id: id * 1 } })}
    >
      <DeleteIcon />
    </IconButton>
  );
}
