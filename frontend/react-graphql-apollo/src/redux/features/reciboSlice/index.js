import { createSlice } from "@reduxjs/toolkit";

//TODO: agregar recibo venta transferencia
const initialState = {
  usuario_id: null,
  venta: {
    empresa_cliente_id: null,
    lineas: [],
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
      console.log(action.payload);
      const { empresa_cliente_id, reciboTipo } = action.payload;
      console.log(".......................");
      console.log(empresa_cliente_id, reciboTipo);
      if (reciboTipo === "venta") {
        console.log("---------------------");
        state.venta.empresa_cliente_id = empresa_cliente_id.id;
      }
    },
    modQty: (state, action) => {
      console.log(action.payload);
      const tipoRecibo = action.payload.tipo;
      let { idx, qty } = action.payload;
      if (qty < 0) qty = 0;
      state[tipoRecibo].lineas[idx].qty = qty;
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
    deleteLinea: (state, action) => {
      const tipoRecibo = action.payload.tipo;
      console.log(action.payload);
      const newArr = state[tipoRecibo].lineas.filter(
        (linea) => linea.id !== action.payload.item_id
      );
      state[tipoRecibo].lineas = newArr;
    },
  },
});

export const {
  addUserId,
  delUserId,
  addClienteId,
  pushLinea,
  modQty,
  addRecibo,
  deleteLinea,
} = reciboSlice.actions;

export default reciboSlice.reducer;
