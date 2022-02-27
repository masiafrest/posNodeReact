import { useMutation } from "@apollo/client";
import { DelVenta } from "../grapql/mutation";
import { modifyCacheOnDelete } from "../../../../utils/apollo";
import useToggle from "../../../../utils/hooks/useToggle";
import DeleteModal from "../../../../components/DeleteModal";

import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSnackbar } from "notistack";

export default function DelBtn({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, toggleIsOpen] = useToggle(false);

  const [delVenta, { loading }] = useMutation(DelVenta, {
    update(cache) {
      modifyCacheOnDelete(cache, id, "ventas");
    },
    onCompleted(data) {
      const { id } = data.delVenta;
      toggleIsOpen();
      enqueueSnackbar(`Venta ${id} eliminado`, {
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
        // onClick={() => delVenta({ variables: { id: id * 1 } })}
        onClick={toggleIsOpen}
      >
        <DeleteIcon />
      </IconButton>
      <DeleteModal
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        delItem={() => delVenta({ variables: { id: id * 1 } })}
      />
    </>
  );
}
