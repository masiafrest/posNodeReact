import { useState } from "react";
import { round } from "lodash";
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
import {
  addTax,
  addTotal,
} from "../../../../../../../../redux/features/reciboSlice";
import TableHeader from "./TableHeader";
import TotalTable from "./TotalTable";
import QtyEditField from "../QtyEditField";
import PriceEditField from "../PriceEditField";
import DelBtn from "../DelBtn";
import AddLineDialog from "./AddLineDialog";

const useStyles = makeStyles((theme) => ({
  styleRows: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function VentaTable({ isVenta = true, venta }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { subTotal, tax, total, lineas } = venta;
  const [isTax, setIsTax] = useState(true);
  dispatch(addTax(isTax ? round((7 / 100) * subTotal, 2) : 0));
  dispatch(addTotal(round(subTotal + tax, 2)));

  const lineasTable = lineas?.map(
    ({ precio, precioMin, descripcion, qty, id }, idx) => (
      <TableRow className={classes.styleRows} key={id}>
        <TableCell key={`qty-id-${idx}`} align="left">
          {isVenta ? (
            <>
              <DelBtn tipo="venta" id={id} idx={idx} />
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
          {isVenta ? (
            <PriceEditField
              itemId={id}
              precio={precio}
              precioMin={precioMin}
              idx={idx}
            />
          ) : (
            precio
          )}
        </TableCell>
        <TableCell key={`qty-total-${idx}`} align="right">
          <Typography>{(precio * qty).toFixed(2)}</Typography>
        </TableCell>
      </TableRow>
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 300 }} padding="normal" size="small">
        <TableHeader />
        <TableBody>
          {lineasTable}
          <TableRow>
            {isVenta && (
              <TableCell align="center" colSpan={4}>
                <AddLineDialog />
              </TableCell>
            )}
          </TableRow>
          <TotalTable
            subTotal={subTotal}
            tax={tax}
            total={total}
            setIsTax={setIsTax}
            isTax={isTax}
            isVenta={isVenta}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
