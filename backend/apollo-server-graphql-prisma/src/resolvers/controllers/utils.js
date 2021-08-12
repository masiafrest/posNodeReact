const jwt = require("jsonwebtoken");
const APP_SECRET = "secrectWord";

const splitArrBySpace = (filter, type) => {
  return filter.split(" ").map((e) => {
    const contains = `${e}`.replace("'", "")

    if (type === 'item') return ({
      search_text: {
        contains
      }
    })

    if (type === 'venta') return ({
      nombre: {
        contains
      },
      search_text: { contains }

    })

    return {
      nombre: {
        contains
      },
    };
  });
};

const getToken = (user) => {
  return jwt.sign(user, APP_SECRET);
};

function tradeTokenForUser(authToken) {
  const token = authToken.replace("Bearer ", "");
  if (!token) {
    console.warn("No token found");
  }
  const user = jwt.verify(token, APP_SECRET);
  return user;
}

async function delImg(paths) {
  const fs = require("fs");
  const path = require("path");
  let imgPath;

  paths.map((element) => {
    console.log('element, ', element)
    imgPath = path.resolve("public/images/items", element);
    console.log("imgs:, ", imgPath);
    try {
      if (fs.existsSync(imgPath)) {
        console.log("The file exists.");
        try {
          fs.unlinkSync(imgPath);
          //file removed
          console.log(imgPath, "archivo eliminado");
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("The file does not exist.");
        return "The file does not exist."
      }
    } catch (err) {
      console.error(err);
    }
  });
  console.log("delImg");
}

module.exports = {
  APP_SECRET,
  splitArrBySpace,
  getToken,
  tradeTokenForUser,
  delImg
};
