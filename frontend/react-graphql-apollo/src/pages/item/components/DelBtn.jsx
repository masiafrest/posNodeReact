import { useMutation } from "@apollo/client";
import { DEL_ITEM } from "../graphql/mutation";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

export default function DelBtn({ id, paths }) {
  const [delItem, { loading, error }] = useMutation(DEL_ITEM, {
    update(cache, { data: { delItem } }) {
      cache.modify({
        fields: {
          items(existingItems = [], { readField }) {
            return existingItems.filter(
              (itemRef) => id !== readField("id", itemRef)
            );
          },
        },
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
