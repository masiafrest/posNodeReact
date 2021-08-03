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
const { postVenta } = require("./controllers/recibos/venta");
const { signup, login } = require("./controllers/usuario");

const { authenticated } = require('./authUtil')

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
  postVenta,
  signup,
  login,
}

let authMutations = { ...mutations }

const authArr = [
  'postItem',
  'updateItem',
  'delItem',
  'postCategoria',
  'updateCategoria',
  'delCategoria',
  'postUbicacion',
  'postCliente',
  'updateCliente',
  'delCliente',
  'postVenta',
  'signup',
]

for (e of authArr) {
  authMutations[e] = authenticated(mutations[e])
}

module.exports = authMutations