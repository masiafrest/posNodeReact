import { useRef } from "react";
import ComponentToPrint from "../ComponentToPrint";
import ReactToPrint from "react-to-print";

import { useSelector } from "react-redux";

export default function PrintBtn({ btnComp, cliente, ...props }) {
  const componentRef = useRef();
  const venta = useSelector((state) => state.recibo.venta);
  const { subTotal, tax, total, lineas, credito } = venta;

  return (
    <>
      <ReactToPrint
        {...props}
        trigger={() => btnComp}
        content={() => componentRef.current}
      />
      <ComponentToPrint
        ref={componentRef}
        lineas={lineas}
        client={cliente}
        subTotal={subTotal}
        tax={tax}
        total={total}
      />
    </>
  );
}
