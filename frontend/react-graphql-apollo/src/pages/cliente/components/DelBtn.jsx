import { useMutation } from "@apollo/client";
import { DEL_CLIENTE } from "../graphql/mutation";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

export default function DelBtn({ id }) {
  const [delCliente, { loading, error }] = useMutation(DEL_CLIENTE, {
    update(cache, { data: { delCliente } }) {
      cache.modify({
        fields: {
          clientes(existingClientes = [], { readField }) {
            return existingClientes.filter(
              (clienteRef) => id !== readField("id", clienteRef)
            );
          },
        },
      });
    },
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
