import { useRef } from "react";
import ComponentToPrint from "./ComponentToPrint";
import ReactToPrint from "react-to-print";

export default function PrintBtn({ btnComp, venta, ...props }) {
  const componentRef = useRef();
  const { credito, total } = venta;
  const docTitle = `${credito ? "credito" : "contado"}, $${total}`;
  return (
    <>
      <ReactToPrint
        {...props}
        trigger={() => {
          return btnComp;
        }}
        content={() => componentRef.current}
        onBeforeGetContent={() => {
          document.title = docTitle;
        }}
        documentTitle={docTitle}
        removeAfterPrint
      />
      <ComponentToPrint venta={venta} ref={componentRef} />
    </>
  );
}
