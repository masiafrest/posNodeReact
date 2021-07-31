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

const getToken = (userId) => {
  return jwt.sign({ userId }, APP_SECRET);
};

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);

    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  splitArrBySpace,
  getToken,
  getUserId,
};
