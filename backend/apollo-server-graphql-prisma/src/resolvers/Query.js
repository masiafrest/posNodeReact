const { categorias } = require("./controllers/categoria");
const { ubicaciones } = require("./controllers/ubicacion");
const { clientes } = require("./controllers/cliente");
const { items, item } = require("./controllers/item");
const { ventas } = require("./controllers/recibos/venta");

const { authenticated } = require('./authUtil')

const queries = {
  items,
  item,
  categorias,
  ubicaciones,
  clientes,
  ventas,
}

let authQueries = {}

for (query in queries) {
  authQueries[query] = authenticated(queries[query])
}

module.exports = authQueries
