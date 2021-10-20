import { useMutation } from "@apollo/client";
import { DEL_ITEM } from "../graphql/mutation";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";

export default function DelBtn({ id, paths }) {
  const { enqueueSnackbar } = useSnackbar();

  const [delItem, { loading, error }] = useMutation(DEL_ITEM, {
    update(cache, { data: { delItem } }) {
      cache.modify({
        fields: {
          items(existingItems = { query: [] }, { readField }) {
            console.log("delbtn existing Items:", existingItems);
            return existingItems.query.filter(
              (itemRef) => id !== readField("id", itemRef)
            );
          },
        },
      });
    },
    onCompleted(data) {
      const { descripcion } = data.delItem;
      enqueueSnackbar(`item ${descripcion} eliminado`, {
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
      onClick={() => delItem({ variables: { id: id * 1, paths } })}
    >
      <DeleteIcon />
    </IconButton>
  );
}
