import React from "react";
import dayjs from "dayjs";
import "./ComponentToPrint.css";
import { Box, makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
  centerButtonDialog: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "10px",
  },
}));

export default class ComponentToPrint extends React.Component {
  render() {
    const {
      venta: { subTotal, tax, total, credito, lineas, cliente },
    } = this.props;

    return (
      <Box display="none" displayPrint="block">
        <header>
          <h1>Nota de entrega - Detalle de producto</h1>
          <h2>Documento no fiscal</h2>
          <div className="headerAddress">
            <address>
              <p>Cliente: {cliente}</p>
            </address>
            <address>{credito ? "Credito" : "Contado"}</address>
          </div>
        </header>
        <article>
          <table className="meta">
            <tbody>
              <tr>
                <th>
                  <span>Fecha</span>
                </th>
                <td>
                  <span>{dayjs().format("DD-MMM-YYYY")}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="inventory">
            <thead>
              <tr>
                <th>
                  <span>Qty</span>
                </th>
                <th>
                  <span>Descripcion</span>
                </th>
                <th>
                  <span>Precio</span>
                </th>

                <th>
                  <span>Total</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {lineas.map((linea) => (
                <tr key={`item_id-${linea?.id}-${linea?.descripcion}`}>
                  <td>
                    <span>{linea?.qty}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span>{linea?.descripcion}</span>
                  </td>
                  <td>
                    <span data-prefix>$</span>
                    <span>{linea?.precio?.toFixed(2)}</span>
                  </td>
                  <td>
                    <span data-prefix>$</span>
                    <span>{(linea?.precio * linea?.qty).toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="balance">
            <tbody>
              <tr>
                <th>
                  <span>SubTotal</span>
                </th>
                <td>
                  <span data-prefix>$</span>
                  <span>{subTotal.toFixed(2)}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Tax</span>
                </th>
                <td>
                  <span data-prefix>$</span>
                  <span>{tax.toFixed(2)}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Total</span>
                </th>
                <td>
                  <span data-prefix>$</span>
                  <span>{total.toFixed(2)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        {/* <aside>
          <h1>
            <span>Notas Adicionales</span>
          </h1>
          <div>
            <p>despues de 30 dias el equipo es propiedad del comerciante</p>
          </div>
        </aside> */}
      </Box>
    );
  }
}
