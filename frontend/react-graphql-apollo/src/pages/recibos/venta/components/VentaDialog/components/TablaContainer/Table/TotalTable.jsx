import {
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export default function TotalTable({
  subTotal,
  tax,
  total,
  setIsTax,
  isTax,
  isVenta,
}) {
  return (
    <>
      <TableRow key="subtotal">
        <TableCell rowSpan={3} />
        <TableCell colSpan={2}>Subtotal</TableCell>
        <TableCell align="right">{subTotal}</TableCell>
      </TableRow>
      <TableRow key="tax">
        <TableCell colSpan={1}>
          {isVenta && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTax}
                  onChange={() => setIsTax(!isTax)}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Tax"
            />
          )}
        </TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right">{tax}</TableCell>
      </TableRow>
      <TableRow key="total">
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell align="right">{total}</TableCell>
      </TableRow>
    </>
  );
}
