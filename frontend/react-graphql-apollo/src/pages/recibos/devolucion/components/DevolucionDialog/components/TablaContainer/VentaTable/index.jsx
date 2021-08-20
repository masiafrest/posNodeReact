import {
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import TableHeader from "./TableHeader";
import QtyEditField from "../QtyEditField";
import DelBtn from "../DelBtn";

const useStyles = makeStyles((theme) => ({
  styleRows: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function DevolucionTable({ isDevolucion = true, devolucion }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { lineas } = devolucion;

  const lineasTable = lineas?.map(
    (
      {
        descripcion,
        qty,
        id,
        descripcionDevolucion,
        qtyDevolucion,
        itemIdDevolucion,
      },
      idx
    ) => (
      <TableRow className={classes.styleRows} key={id}>
        <TableCell key={`qty-id-${idx}`} align="left">
          {isDevolucion ? (
            <>
              <DelBtn tipo="devolucion" id={id} idx={idx} />
              <QtyEditField itemId={id} qty={qty} idx={idx} />
            </>
          ) : (
            qty
          )}
        </TableCell>
        <TableCell key={`qty-descripcion-${idx}`} align="center">
          <Typography>{descripcion}</Typography>
        </TableCell>
        <TableCell key={`qty-precio-${idx}`} align="right">
          precio
        </TableCell>
        <TableCell key={`qty-total-${idx}`} align="right">
          <Typography>{(precio * qty).toFixed(2)}</Typography>
        </TableCell>
      </TableRow>
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 300 }} padding="none" size="small">
        <TableHeader />
        <TableBody>
          {lineasTable}
          <TableRow key="separator">
            <TableCell colSpan={4}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
