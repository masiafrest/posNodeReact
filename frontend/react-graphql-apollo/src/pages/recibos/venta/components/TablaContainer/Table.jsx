import {
  IconButton,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

// import ModQty from "../ModQty";

export default function VentaTable({ items }) {
  const subTotal = items.reduce((total, item) => {
    return item.qty * item.precio.precio + total;
  }, 0);
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 300 }} padding="default" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map(
            ({ marca, modelo, precio: { precio }, descripcion, qty, id }) => (
              <TableRow key={id}>
                <TableCell align="left">
                  {qty}
                  {/* <ModQty item={row} reciboTipo="venta" idx={idx} /> */}
                </TableCell>
                <TableCell align="left">
                  {marca} {modelo} {descripcion}
                </TableCell>
                <TableCell align="right">{precio}</TableCell>
                <TableCell align="right">{precio * qty}</TableCell>
              </TableRow>
            )
          )}
          <TableRow>
            <TableCell colSpan={4}>
              <IconButton
                size="small"
                // onClick={onClickHandler}
              >
                <AddBoxIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{subTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={isTax}
                    // onChange={(e) => setIsTax(!isTax)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Tax"
              />
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
