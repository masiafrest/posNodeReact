import { TableRow, TableHead, TableCell } from "@material-ui/core";

export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          width='20'
          align="center">Qty</TableCell>
        <TableCell
          align="center">Descripcion</TableCell>
        <TableCell
          width='20'
          align="right">Precio</TableCell>
        <TableCell
          width='50'
          align="right">Total</TableCell>
      </TableRow>
    </TableHead>
  );
}
