import { useMutation } from "@apollo/client";
import { DEL_CLIENTE } from "../graphql/mutation";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";

export default function DelBtn({ id }) {
  const { enqueueSnackbar } = useSnackbar();

  const [delCliente, { loading, error }] = useMutation(DEL_CLIENTE, {
    update(cache, { data: { delCliente } }) {
      cache.modify({
        fields: {
          clientes(existingClientes = [], { readField }) {
            return existingClientes.query.filter(
              (clienteRef) => id !== readField("id", clienteRef)
            );
          },
        },
      });
    },
    onCompleted(data) {
      const { nombre } = data.delCliente
      enqueueSnackbar(`cliente ${nombre} eliminado`, {
        variant: "success",
      });
    },
    onError(e) {
      enqueueSnackbar(e.message, {
        variant: "warning",
      });
    }
  });

  return (
    <IconButton
      disabled={loading}
      onClick={() => delCliente({ variables: { id: id * 1 } })}
    >
      <DeleteIcon />
    </IconButton>
  );
}
