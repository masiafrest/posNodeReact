const express = require("express");
const cors = require("cors");
const { graphqlUploadExpress } = require("graphql-upload");
const path = require("path");

const { localIp } = require("../utils/getLocalIp");
console.log(localIp);

const app = express();
app.use(express.json());
app.use(cors());

// This middleware should be added before calling `applyMiddleware`.
app.use(graphqlUploadExpress({ maxFiles: 3 }));

app.use(
  express.static(
    path.join(
      __dirname,
      "../../../../../frontend/react-graphql-apollo",
      "build"
    )
  )
);

app.get("/upload/item/:image", (req, res, next) => {
  const { image } = req.params;
  const pathDir = path.join(__dirname, `../publicTest/images/items/${image}`);
  res.sendFile(pathDir);
});

module.exports = app;
