import { createSlice } from "@reduxjs/toolkit";
import { round } from "lodash";

//TODO: agregar recibo venta transferencia
const initialState = {
  venta: {
    cliente: null,
    credito: false,
    lineas: [],
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  devolucion: {
    cliente: null,
    lineas: [],
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
    resetState: (state, action) => {
      const { reciboTipo } = action.payload;
      state[reciboTipo] = initialState.venta;
    },
    //TODO: add change qty reducer
    addCliente: (state, action) => {
      const { cliente, reciboTipo } = action.payload;
      if (reciboTipo === "venta") {
        state.venta.cliente = cliente;
      }
    },
    editQty: (state, action) => {
      let { qty, tipo, idx } = action.payload;
      state[tipo].lineas[idx].qty = qty;
      state.venta.subTotal = getSubTotal(state.venta.lineas);
    },
    editPrice: (state, action) => {
      let { price, tipo, idx } = action.payload;
      if (price < 0) price = 0;
      state[tipo].lineas[idx].precio = price;
      //refrest subtotal
      state.venta.subTotal = getSubTotal(state.venta.lineas);
    },
    pushLinea: (state, action) => {
      console.log("pushlinea");
      //TODO: revisar si existe o no el item pusheado, si qty del payload es mayor actualizar la qty
      const { tipo, id, descripcion, enqueueSnackbar, custom } = action.payload;
      const hasId = state[tipo].lineas.some((linea) => linea.id === id);
      if (custom) {
        state[tipo].lineas.push(action.payload);
        state.venta.subTotal = getSubTotal(state.venta.lineas);
        enqueueSnackbar(`item ${descripcion} agregado`, {
          variant: "success",
        });
      } else if (!hasId) {
        state[tipo].lineas.push(action.payload);
        state.venta.subTotal = getSubTotal(state.venta.lineas);
        enqueueSnackbar(`item ${descripcion} agregado`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(`item ${descripcion} ya esta agregado`, {
          variant: "warning",
        });
      }
    },
    addRecibo: (state, action) => {
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo] = action.payload;
    },
    delLinea: (state, action) => {
      const tipoRecibo = action.payload.tipo;
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
    toggleCredit: (state) => {
      state.venta.credito = !state.venta.credito;
    },
  },
});

export const {
  resetState,
  addCliente,
  pushLinea,
  editQty,
  editPrice,
  addRecibo,
  delLinea,
  addTax,
  addTotal,
  toggleCredit,
} = reciboSlice.actions;

export default reciboSlice.reducer;
