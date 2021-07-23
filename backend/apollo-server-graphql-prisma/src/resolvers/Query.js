const { categorias } = require("./controllers/categoria");
const { ubicaciones } = require("./controllers/ubicacion");
const { clientes } = require("./controllers/cliente");
const { items, item } = require("./controllers/item");

module.exports = {
  items,
  item,
  categorias,
  ubicaciones,
  clientes,
};
