const { softDelItem, updateItem, postItem } = require("./controllers/item");
const { postCliente } = require("./controllers/cliente");
const { postUbicacion } = require("./controllers/ubicacion");
const { postCategoria } = require("./controllers/categoria");
const { signup, login } = require("./controllers/usuario");

module.exports = {
  postItem,
  postCategoria,
  postUbicacion,
  updateItem,
  softDelItem,
  postCliente,
  signup,
  login,
};
