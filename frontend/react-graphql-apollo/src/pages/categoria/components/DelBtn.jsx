import { useMutation } from "@apollo/client";
import { DEL_CATEGORIA } from "../graphql/mutation";
import { GET_CATEGORIAS } from "../graphql/query";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";

export default function DelBtn({ id }) {
  const { enqueueSnackbar } = useSnackbar();

  const [delCategoria, { loading, error }] = useMutation(DEL_CATEGORIA, {
    update(cache, { data: { delCategoria } }) {
      console.log("delCategoria: ", delCategoria);
      cache.modify({
        fields: {
          categorias(existingCategorias = [], { readField }) {
            console.log("existingCategorias:", existingCategorias);
            return existingCategorias.query.filter(
              (categoriaRef) => id !== readField("id", categoriaRef)
            );
          },
        },
      });
    },
    onCompleted(data) {
      const { nombre } = data.delCategoria;
      enqueueSnackbar(`categoria ${nombre} eliminado`, {
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
      onClick={() => delCategoria({ variables: { id: id * 1 } })}
    >
      <DeleteIcon />
    </IconButton>
  );
}
