import { createSlice } from "@reduxjs/toolkit";
import { round } from "lodash";

//TODO: agregar recibo venta transferencia
const initialState = {
  usuario_id: null,
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

const reciboSlice = createSlice({
  name: "recibos",
  initialState,
  reducers: {
    //TODO: add change qty reducer
    addUserId: (state, action) => {
      state.usuario_id = action.payload;
    },
    delUserId: (state) => {
      state.usuario_id = null;
    },
    addClienteId: (state, action) => {
      console.log("action.payload", action.payload);
      const { clienteId, reciboTipo } = action.payload;
      console.log(".......................");
      console.log(clienteId, reciboTipo);
      if (reciboTipo === "venta") {
        console.log("---------------------");
        state.venta.clienteId = clienteId;
      }
    },
    editQty: (state, action) => {
      console.log(action.payload);
      let { qty, tipo, idx } = action.payload;
      if (qty < 0) qty = 0;
      state[tipo].lineas[idx].qty = qty;
    },
    editPrice: (state, action) => {
      console.log(action.payload);
      let { price, tipo, idx } = action.payload;
      if (price < 0) price = 0;
      state[tipo].lineas[idx].precio.precio = price;
    },
    pushLinea: (state, action) => {
      //TODO: revisar si existe o no el item pusheado, si qty del payload es mayor actualizar la qty
      const tipoRecibo = action.payload.tipo;
      const hasId = state[tipoRecibo].lineas.some(
        (linea) => linea.id === action.payload.id
      );
      if (hasId) {
        state[tipoRecibo].lineas.filter((linea, idx) => {
          if (linea.id === action.payload.id) {
            state[tipoRecibo].lineas[idx] = action.payload;
          }
        });
      } else {
        state[tipoRecibo].lineas.push(action.payload);
      }
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
    },
    addSubTotal: (state, action) => {
      state.venta.subTotal = action.payload.reduce((total, item) => {
        return round(item.qty * item.precio.precio + total, 2);
      }, 0);
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
  addUserId,
  delUserId,
  addClienteId,
  pushLinea,
  editQty,
  editPrice,
  addRecibo,
  delLinea,
  addSubTotal,
  addTax,
  addTotal,
} = reciboSlice.actions;

export default reciboSlice.reducer;
