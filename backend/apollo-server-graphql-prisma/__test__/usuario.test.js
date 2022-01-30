const url = `http://localhost:${process.env.PORT}`;
const supertest = require("supertest");
// const request = require("supertest");
const app = require("../src/server/expressApp");
const { server, startServer } = require("../src/server");

process.env.NODE_ENV = "development";
process.env.PORT = 3888;

afterAll(async () => {
  await server.stop();
});

describe("usuario Graphql", (done) => {
  it("return users", (done) => {
    const res = supertest(app).post("/graphql").send({
      query: "",
    });
    console.log("res", res);
    done();
  });
});
