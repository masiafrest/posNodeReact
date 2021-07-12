import { useMutation } from "@apollo/client";
import { DEL_CATEGORIA } from "../../graphql/mutation";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

export default function DelBtn({ id }) {
  const [delCategoria, { loading, error }] = useMutation(DEL_CATEGORIA, {
    update(cache, { data: { delCategoria } }) {
      cache.modify({
        fields: {
          categorias(existingCategorias = [], { readField }) {
            return existingCategorias.filter(
              (categoriaRef) => id !== readField("id", categoriaRef)
            );
          },
        },
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
