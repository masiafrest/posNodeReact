import { useState } from "react";
import { round } from "lodash";
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
import { useSelector, useDispatch } from "react-redux";
import {
  addSubTotal,
  addTax,
  addTotal,
} from "../../../../../redux/features/reciboSlice";

export default function VentaTable({ items }) {
  const dispatch = useDispatch();
  const { subTotal, tax, total } = useSelector((state) => state.recibo.venta);
  const [isTax, setIsTax] = useState(true);
  dispatch(addSubTotal(items));
  dispatch(addTax(isTax ? round((7 / 100) * subTotal, 2) : 0));
  dispatch(addTotal(round(subTotal + tax, 2)));

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
                <TableCell align="right">
                  {parseFloat(precio).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {parseFloat(precio * qty).toFixed(2)}
                </TableCell>
              </TableRow>
            )
          )}
          <TableRow key="add-item">
            <TableCell colSpan={4}>
              <IconButton
                size="small"
                // onClick={onClickHandler}
              >
                <AddBoxIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="subtotal">
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{subTotal}</TableCell>
          </TableRow>
          <TableRow key="tax">
            <TableCell colSpan={1}>
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
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{tax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
