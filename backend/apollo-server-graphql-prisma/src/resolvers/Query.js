const { categorias } = require("./controllers/categoria");
const { ubicaciones } = require("./controllers/ubicacion");
const { clientes } = require("./controllers/cliente");
const { items, item } = require("./controllers/item");
const { ventas } = require("./controllers/recibos/venta");

const authenticated = (next) => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new Error(`Unauthenticated!`);
  }

  return next(root, args, context, info);
};
module.exports = {
  items,
  item,
  categorias,
  ubicaciones,
  clientes,
  ventas,
};
