import { createSlice } from "@reduxjs/toolkit";
import { round } from "lodash";

//TODO: agregar recibo venta transferencia
const initialState = {
  venta: {
    clienteId: null,
    credito: false,
    lineas: [],
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  transferencia: {
    lineas: [],
  },
};

const getSubTotal = (lineas) =>
  lineas.reduce((total, linea) => {
    return round(linea.qty * linea.precio + total, 2);
  }, 0);

const reciboSlice = createSlice({
  name: "recibos",
  initialState,
  reducers: {
    //TODO: add change qty reducer
    addClienteId: (state, action) => {
      const { clienteId, reciboTipo } = action.payload;
      if (reciboTipo === "venta") {
        state.venta.clienteId = clienteId;
      }
    },
    editQty: (state, action) => {
      let { qty, tipo, idx } = action.payload;
      state[tipo].lineas[idx].qty = qty;
      state.venta.subTotal = getSubTotal(state.venta.lineas);
    },
    editPrice: (state, action) => {
      let { price, tipo, idx } = action.payload;
      console.log(price);
      if (price < 0) price = 0;
      state[tipo].lineas[idx].precio = price;
      //refrest subtotal
      state.venta.subTotal = getSubTotal(state.venta.lineas);
    },
    pushLinea: (state, action) => {
      //TODO: revisar si existe o no el item pusheado, si qty del payload es mayor actualizar la qty
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo].lineas.push(action.payload);
      state.venta.subTotal = getSubTotal(state.venta.lineas);
    },
    addRecibo: (state, action) => {
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo] = action.payload;
    },
    delLinea: (state, action) => {
      const tipoRecibo = action.payload.tipo;
      console.log(action.payload);
      const newArr = state[tipoRecibo].lineas.filter(
        (linea) => linea.id !== action.payload.id
      );
      state[tipoRecibo].lineas = newArr;
      state.venta.subTotal = getSubTotal(state.venta.lineas);
    },
    addTax: (state, action) => {
      state.venta.tax = action.payload;
    },
    addTotal: (state, action) => {
      state.venta.total = action.payload;
    },
  },
});

export const {
  addClienteId,
  pushLinea,
  editQty,
  editPrice,
  addRecibo,
  delLinea,
  addTax,
  addTotal,
} = reciboSlice.actions;

export default reciboSlice.reducer;
