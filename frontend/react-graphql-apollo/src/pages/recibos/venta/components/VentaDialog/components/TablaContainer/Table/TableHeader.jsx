import { TableRow, TableHead, TableCell } from "@material-ui/core";

export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Qty</TableCell>
        <TableCell align="center">Descripcion</TableCell>
        <TableCell align="right">Precio</TableCell>
        <TableCell align="right">Total</TableCell>
      </TableRow>
    </TableHead>
  );
}
