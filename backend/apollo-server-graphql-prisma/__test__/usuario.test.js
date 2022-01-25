const url = `http://localhost:${process.env.PORT}`;
const supertest = require("supertest");
// const request = require("supertest");
const app = require("../src/testServer");
const { server } = require("../src/testServer");

afterAll(async () => {
  await server.stop();
});

describe("usuario Graphql", (done) => {
  it("return users", (done) => {
    const res = supertest(app).get("/graphql");
    console.log(res);
    done();
  });
});
