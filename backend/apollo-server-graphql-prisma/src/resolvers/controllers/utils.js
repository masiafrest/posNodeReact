const jwt = require("jsonwebtoken");
const APP_SECRET = "secrectWord";

const splitArrBySpace = (words, key) => {
  return words.split(" ").map((e) => {
    const contains = `${e}`.replace(" ", "");

    return {
      [key]: {
        contains,
      },
    };
  });
};

const getToken = (user) => {
  return jwt.sign(user, APP_SECRET);
};

function tradeTokenForUser(authToken) {
  const splitedAuthToken = authToken.split(" ");
  const token = splitedAuthToken[1];
  if (!token) {
    console.warn("No token found");
  }
  return jwt.verify(token, APP_SECRET);
}

async function delImg(paths) {
  const fs = require("fs");
  const path = require("path");
  let imgPath;

  paths.map((element) => {
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
        return "The file does not exist.";
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
  delImg,
};
