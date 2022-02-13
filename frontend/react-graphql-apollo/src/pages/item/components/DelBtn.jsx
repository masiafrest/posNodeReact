import { useMutation } from "@apollo/client";
import { DEL_ITEM } from "../graphql/mutation";

import useToggle from "../../../utils/hooks/useToggle";
import DeleteModal from "../../../components/DeleteModal";

import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";

export default function DelBtn({ id, paths }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, toggleIsOpen] = useToggle(false);

  const [delItem, { loading }] = useMutation(DEL_ITEM, {
    update(cache, { data: { delItem } }) {
      cache.modify({
        fields: {
          items(existingItems = { query: [] }, { readField }) {
            return existingItems.query.filter(
              (itemRef) => id !== readField("id", itemRef)
            );
          },
        },
      });
    },
    onCompleted(data) {
      const { descripcion } = data.delItem;
      toggleIsOpen();
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
    <>
      <IconButton
        disabled={loading}
        // onClick={() => delItem({ variables: { id: id * 1, paths } })}
        onClick={toggleIsOpen}
      >
        <DeleteIcon />
      </IconButton>
      <DeleteModal
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        delItem={() => delItem({ variables: { id: id * 1, paths } })}
      />
    </>
  );
}
