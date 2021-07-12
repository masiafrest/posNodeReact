const { delItem, updateItem, postItem } = require("./controllers/item");
const {
  postCliente,
  updateCliente,
  delCliente,
} = require("./controllers/cliente");
const { postUbicacion } = require("./controllers/ubicacion");
const { postCategoria } = require("./controllers/categoria");
const { signup, login } = require("./controllers/usuario");

module.exports = {
  postItem,
  postCategoria,
  postUbicacion,
  updateItem,
  delItem,
  postCliente,
  updateCliente,
  delCliente,
  signup,
  login,
};
