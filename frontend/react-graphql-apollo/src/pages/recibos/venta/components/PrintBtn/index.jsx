import { useRef } from "react";
import ComponentToPrint from "./ComponentToPrint";
import ReactToPrint from "react-to-print";

export default function PrintBtn({ btnComp, cliente, venta, ...props }) {
  const componentRef = useRef();
  const { credito, total } = venta;
  return (
    <>
      <ReactToPrint
        {...props}
        trigger={() => {
          return btnComp;
        }}
        content={() => componentRef.current}
        documentTitle={`${credito ? "credito" : "contado"}, $${total}`}
      />
      <ComponentToPrint venta={venta} ref={componentRef} cliente={cliente} />
    </>
  );
}
