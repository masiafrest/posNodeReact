require("dotenv").config();
const NODE_ENV = process.env.NODE_ENV;
let PORT = process.env.PORT;
let POSTGRES_DB = process.env.POSTGRES_DB;
let POSTGRES_USER = process.env.POSTGRES_USER;
let POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
let DATABASE_URL = process.env.DATABASE_URL;
let JWT_SECRET = process.env.JWT_SECRET;

if (NODE_ENV === "test") {
  PORT = 4001;
  POSTGRES_DB = process.env.POSTGRES_TEST_DB;
  POSTGRES_USER = process.env.POSTGRES_USER;
  POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
  // how prisma will handle this ??
  DATABASE_URL = process.env.DATABASE_URL;

  JWT_SECRET = process.env.JWT_SECRET;
}

module.exports = {
  PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  JWT_SECRET,
  DATABASE_URL,
};
