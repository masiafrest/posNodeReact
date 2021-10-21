import { useRef } from "react";
import ComponentToPrint from "./ComponentToPrint";
import ReactToPrint from "react-to-print";

import { useSelector } from "react-redux";

export default function PrintBtn({ btnComp, cliente, venta, ...props }) {
  const componentRef = useRef();

  return (
    <>
      <ReactToPrint
        {...props}
        trigger={() => btnComp}
        content={() => componentRef.current}
      />
      <ComponentToPrint
        venta={venta}
        ref={componentRef}
        cliente={cliente}
        // lineas={lineas}
        // subTotal={subTotal}
        // tax={tax}
        // total={total}
        // credito={credito}
      />
    </>
  );
}
