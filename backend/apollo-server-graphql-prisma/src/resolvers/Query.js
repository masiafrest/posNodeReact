const { categorias, getAllCategorias } = require("./controllers/categoria");
const { ubicaciones } = require("./controllers/ubicacion");
const { clientes } = require("./controllers/cliente");
const { items, item } = require("./controllers/item");
const { ventas } = require("./controllers/recibos/venta");
const { devoluciones } = require("./controllers/recibos/devolucion");

const { authenticated } = require("./authUtil");

const queries = {
  items,
  item,
  getAllCategorias,
  categorias,
  ubicaciones,
  clientes,
  ventas,
  devoluciones,
};

let authQueries = {};

for (query in queries) {
  authQueries[query] = authenticated(queries[query]);
}

module.exports = authQueries;
