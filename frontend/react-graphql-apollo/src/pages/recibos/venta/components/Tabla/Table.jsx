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

import ModQty from "../ModQty";

export default function VentaTable({
  items,
  invoice,
  TAX_RATE,
  onClickHandler,
  taxState,
}) {
  const [Subtotal, Taxes, Total] = invoice;
  const [isTax, setIsTax] = taxState;
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
          {items.map((row, idx) => (
            <TableRow key={row.id}>
              <TableCell align="left">
                <ModQty item={row} reciboTipo="venta" idx={idx} />
              </TableCell>
              <TableCell align="left">{`${row.marca} ${row.modelo} ${row.color} ${row.descripcion} id: ${row.id} `}</TableCell>
              <TableCell align="right">
                {row.precio.precio.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {(row.precio.precio * row.qty).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4}>
              <IconButton size="small" onClick={onClickHandler}>
                <AddBoxIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{Subtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTax}
                    onChange={(e) => setIsTax(!isTax)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Tax"
              />
            </TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{Taxes.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{Total.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
