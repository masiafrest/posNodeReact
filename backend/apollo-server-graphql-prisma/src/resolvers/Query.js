const { categorias } = require("./controllers/categoria");
const { ubicaciones } = require("./controllers/ubicacion");
const { clientes } = require("./controllers/cliente");
const { items } = require("./controllers/item");

module.exports = {
  items,
  categorias,
  ubicaciones,
  clientes,
};
