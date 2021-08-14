import { useState } from "react";
import { round } from "lodash";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  addTax,
  addTotal,
} from "../../../../../../../../redux/features/reciboSlice";
import TableHeader from "./TableHeader";
import TotalTable from "./TotalTable";
import QtyEditField from "../QtyEditField";
import PriceEditField from "../PriceEditField";
import DelBtn from "../DelBtn";

export default function VentaTable({ isVenta = true, venta }) {
  const dispatch = useDispatch();
  const { subTotal, tax, total, lineas } = venta;
  const [isTax, setIsTax] = useState(true);
  dispatch(addTax(isTax ? round((7 / 100) * subTotal, 2) : 0));
  dispatch(addTotal(round(subTotal + tax, 2)));

  const lineasTable = lineas?.map(
    ({ precio, precioMin, descripcion, qty, id }, idx) => (
      <TableRow key={id}>
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
        <TableCell key={`qty-descripcion-${idx}`} align="left">
          {descripcion}
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
          {(precio * qty).toFixed(2)}
        </TableCell>
      </TableRow>
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 300 }} padding="default" size="small">
        <TableHeader />
        <TableBody>
          {lineasTable}
          <TableRow key="separator">
            <TableCell colSpan={4}>
              <hr />
            </TableCell>
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
