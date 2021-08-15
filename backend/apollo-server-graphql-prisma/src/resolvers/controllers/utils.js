const jwt = require("jsonwebtoken");
const APP_SECRET = "secrectWord";

const splitArrBySpace = (words, key) => {
  console.log('words:', words)
  const noCharWords = words.replace(/[^\w]/gi, ' ')
  console.log('noChar: ', noCharWords)
  const splited = noCharWords.split(" ")
  const noSpace = splited.filter((e, i, a) => a.length > 0 && e !== '')

  console.log('nospace:', noSpace)
  return splited.map((e) => {
    const contains = `${e}`.replace("", "");
    return {
      [key]: {
        contains,
      },
    };
  })
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
