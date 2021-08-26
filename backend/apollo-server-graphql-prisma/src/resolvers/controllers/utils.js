const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
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

async function delImg(paths) {
  console.log("delImg paths:", paths);
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
          return "archivo eliminado"
        } catch (err) {
          console.error(err);
          return err.message
        }
      } else {
        console.log("The file does not exist.");
        return "The file does not exist.";
      }
    } catch (err) {
      console.error(err);
    }
  });
}

async function saveImg(images) {
  const storeUpload = async ({ stream, filename, mimetype }) => {
    const { createWriteStream, mkdir } = require("fs");
    await mkdir("public/images/items", { recursive: true }, (err) => {
      if (err) throw err;
    });
    const newFileName = `${Date.now()}${filename}`;
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
    const newImage = await processUpload(image);
    return newImage;
  });

  let imgPath = await Promise.all(imagesPromises).then((res) => res);
  return imgPath.join(', ')
}

module.exports = {
  APP_SECRET,
  splitArrBySpace,
  getToken,
  tradeTokenForUser,
  delImg,
  saveImg
};
