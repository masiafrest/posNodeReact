const url = `http://localhost:${process.env.PORT}`;
const supertest = require("supertest");
// const request = require("supertest");
const { server, startServer } = require("../src/server");

process.env.NODE_ENV = "development";
process.env.PORT = 3888;

afterAll(async () => {
  await server.stop();
});

describe("usuario Graphql", (done) => {
  it("return users", (done) => {
    const res = supertest(startServer()).get("/graphql");
    console.log(res);
    done();
  });
});
