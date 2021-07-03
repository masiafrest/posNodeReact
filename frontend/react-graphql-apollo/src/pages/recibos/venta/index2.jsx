import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import VentaTable from "./components/VentaTable";
import { Button } from "@material-ui/core";
import { roundNum, calcSubTotal } from "../utils";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "../../components/ComponentToPrint";
import { useSnackbar } from "notistack";
//redux
import { RootState } from "../../../../redux/rootReducer";
import { useSelector } from "react-redux";

import Header from "./components/Header";

const TAX_RATE = 0.07;
export default function VentaRecibo() {
  const usuario_id = useSelector((state) => state.user.credentials.id);
  const recibo = useSelector((state) => state.recibo);
  const { lineas } = recibo.venta;
  //TODO: maybe change all this useState to a reduceState
  const [client, setClient] = useState(recibo.venta.empresa_cliente_id && null);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isTax, setIsTax] = useState(true);
  const [credito, setCredito] = useState(false);
  const [pagado, setPagado] = useState(true);

  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const componentRef = useRef();

  const onClickHandler = () => history.push("/show/items");

  const postReciboHandler = async () => {
    const cleanLines = lineas.map((item) => {
      const newLines = {
        item_id: item.id,
        qty: item.qty,
        precio: item.precio.precio,
      };
      return newLines;
    });
    const ventaObj = {
      usuario_id,
      empresa_cliente_id: client.id,
      sub_total: subTotal,
      tax,
      total,
      credito,
      lineas: cleanLines,
      pagado,
    };
    console.log(ventaObj);
    try {
      const res = await axios.post("/recibos/venta/", ventaObj);
      enqueueSnackbar("data guardado", {
        variant: "success",
      });
      console.log(res);
    } catch (err) {
      console.log(err.response);
      enqueueSnackbar("error ", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    //FIX: check why it render 3 time on modQty click
    setSubTotal(roundNum(calcSubTotal(lineas)));
    setTax(roundNum(TAX_RATE * subTotal));
    if (isTax) {
      setTax(roundNum(TAX_RATE * subTotal));
      setTotal(roundNum(tax + subTotal));
    } else {
      setTax(0);
      setTotal(roundNum(subTotal));
    }
  }, [lineas, subTotal, total, isTax, tax]);
  const btnDisabled = lineas.length === 0 || client === null;
  //TODO debieria pasar set client data completo en ves de id solo para ser usado en print
  return (
    <>
      <Header
        creditState={[credito, setCredito]}
        clienteState={[client, setClient]}
        pagadoState={[pagado, setPagado]}
      />
      <VentaTable
        items={lineas}
        invoice={[subTotal, tax, total]}
        TAX_RATE={TAX_RATE}
        onClickHandler={onClickHandler}
        taxState={[isTax, setIsTax]}
      />
      <Button
        variant="contained"
        onClick={postReciboHandler}
        disabled={btnDisabled}
      >
        agregar recibo
      </Button>
      {btnDisabled && <span>agregar cliente y item</span>}

      <ReactToPrint
        trigger={() => <button>imprimir</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint
        ref={componentRef}
        lineas={lineas}
        client={client}
        subTotal={subTotal}
        tax={tax}
        total={total}
        TAX_RATE={TAX_RATE}
        isCredit={credito}
      />
    </>
  );
}
