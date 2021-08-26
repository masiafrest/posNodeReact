const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { doesNotThrow, throws } = require("assert");
const APP_SECRET = "secrectWord";

const splitArrBySpace = (words, key) => {
  const noCharWords = words.replace(/[^\w]/gi, " ");
  const splited = noCharWords.split(" ");
  const noSpace = splited.filter((e, i, a) => a.length > 0 && e !== "");

  return splited.map((e) => {
    const contains = `${e}`.replace("", "");
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

async function delImg(strPaths) {
  const paths = strPaths.split(", ");
  let imgPath;

  // check if all path exist first, then del
  for (const p of paths) {
    if (p !== "") {
      imgPath = path.resolve("public/images/items", p);
      if (fs.existsSync(imgPath)) {
        console.log("The file exists.");
      } else {
        throw new Error(`The file ${p} does not exist.`);
      }
    }
  }

  //del img
  for (const p of paths) {
    if (p !== "") {
      imgPath = path.resolve("public/images/items", p);
      //file removed
      fs.unlinkSync(imgPath);
      console.log(imgPath, "archivo eliminado");
    }
  }
}

async function saveImg(images) {
  const storeUpload = async ({ stream, filename, mimetype }) => {
    const { createWriteStream, mkdir } = require("fs");
    await mkdir("public/images/items", { recursive: true }, (err) => {
      if (err) throw err;
    });
    const newFileName = `${Date.now()}-${filename}`;
    const path = `public/images/items/${newFileName}`;
    // Creates an images folder in the root directory
    // (createWriteStream) writes our file to the images directory
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve(newFileName))
        .on("error", reject)
    );
  };

  const processUpload = async (upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
  };

  const imagesPromises = images.map(async (image) => {
    console.log("imagesPromise: ", image);
    const newImage = await processUpload(image);
    return newImage;
  });

  let imgPath = await Promise.all(imagesPromises).then((res) => res);
  return imgPath.join(", ");
}

module.exports = {
  APP_SECRET,
  splitArrBySpace,
  getToken,
  tradeTokenForUser,
  delImg,
  saveImg,
};
