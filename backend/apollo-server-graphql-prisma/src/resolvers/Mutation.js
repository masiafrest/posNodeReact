const { delItem, updateItem, postItem } = require("./controllers/item");
const {
  postCliente,
  updateCliente,
  delCliente,
} = require("./controllers/cliente");
const { postUbicacion } = require("./controllers/ubicacion");
const {
  postCategoria,
  updateCategoria,
  delCategoria,
} = require("./controllers/categoria");
const {
  postVenta,
  updateVenta,
  delVenta,
} = require("./controllers/recibos/venta");
const { postDevolucion } = require("./controllers/recibos/devolucion");
const {
  postUsuario,
  login,
  updateUsuario,
  delUsuario,
} = require("./controllers/usuario");
const { postModelo, delModelo, updateModelo } = require("./controllers/modelo");

const { postConteoInv } = require("./controllers/conteoInv");
const { authenticated } = require("./authUtil");

const mutations = {
  postItem,
  updateItem,
  delItem,
  postCategoria,
  updateCategoria,
  delCategoria,
  postUbicacion,
  postCliente,
  updateCliente,
  delCliente,
  postDevolucion,
  postVenta,
  updateVenta,
  delVenta,
  postUsuario,
  login,
  updateUsuario,
  delUsuario,
  postModelo,
  delModelo,
  updateModelo,
  postConteoInv,
};

let authMutations = { ...mutations };
for (e of Object.keys(mutations)) {
  authMutations[e] = authenticated(mutations[e]);
}

module.exports = authMutations;
