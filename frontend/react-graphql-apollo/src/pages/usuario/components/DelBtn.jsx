import { useMutation } from "@apollo/client";
import { DEL_USUARIO } from "../../usuario/graphql/mutation";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";

export default function DelBtn({ id }) {
  const { enqueueSnackbar } = useSnackbar();

  const [delUsuario, { loading, error }] = useMutation(DEL_USUARIO, {
    update(cache, { data: { delUsuario } }) {
      cache.modify({
        fields: {
          usuarios(existingUsuarios = [], { readField }) {
            return existingUsuarios.query.filter(
              (usuarioRef) => id !== readField("id", usuarioRef)
            );
          },
        },
      });
    },
    onCompleted(data) {
      const { nombre } = data.delUsuario;
      enqueueSnackbar(`usuario ${nombre} eliminado`, {
        variant: "success",
      });
    },
    onError(e) {
      enqueueSnackbar(e.message, {
        variant: "warning",
      });
    },
  });

  return (
    <IconButton
      disabled={loading}
      onClick={() => delUsuario({ variables: { id: id * 1 } })}
    >
      <DeleteIcon />
    </IconButton>
  );
}
