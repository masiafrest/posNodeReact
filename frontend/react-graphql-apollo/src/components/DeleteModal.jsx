import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  IconButton,
} from "@material-ui/core";
export default function DeleteModal({ isOpen, toggleIsOpen, delItem }) {
  return (
    <Dialog open={isOpen} close={toggleIsOpen}>
      <DialogTitle>Estas seguro que vas a borrarlo?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          esta accion no se puede revertir o deshacer, estas seguro que desea
          borrar?.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            delItem();
            // toggleIsOpen();
          }}
        >
          Borrar
        </Button>
        <Button onClick={toggleIsOpen}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
