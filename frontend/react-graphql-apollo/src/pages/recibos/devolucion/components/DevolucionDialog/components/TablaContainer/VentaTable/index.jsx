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
          {isDevolucion ? (
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
      <Table style={{ minWidth: 300 }} padding="none" size="small">
        <TableHeader />
        <TableBody>
          {lineasTable}
          <TableRow key="separator">
            <TableCell colSpan={4}></TableCell>
          </TableRow>
          <TotalTable
            subTotal={subTotal}
            tax={tax}
            total={total}
            setIsTax={setIsTax}
            isTax={isTax}
            isDevolucion={isDevolucion}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
