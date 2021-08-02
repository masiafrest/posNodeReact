const jwt = require("jsonwebtoken");
const APP_SECRET = "secrectWord";

const splitArrBySpace = (filter, type) => {
  return filter.split(" ").map((e) => {
    return type === "item"
      ? {
          search_text: {
            contains: `${e}`.replace("'", ""),
          },
        }
      : {
          nombre: {
            contains: `${e}`.replace("'", ""),
          },
        };
  });
};

const getToken = (user) => {
  return jwt.sign(
    { userId: user.id, userRol: user.rol, userNombre: user.nombre },
    APP_SECRET
  );
};

function tradeTokenForUser(authToken) {
  const token = authToken.replace("Bearer ", "");
  if (!token) {
    console.warn("No token found");
  }
  const user = jwt.verify(token, APP_SECRET);
  console.log("user", user);
  return user;
}

module.exports = {
  APP_SECRET,
  splitArrBySpace,
  getToken,
  tradeTokenForUser,
};
