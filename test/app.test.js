const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../src/app");

describe("Route to api/rates", () => {
  it("should return status 200", async () => {
    let res = await chai
      .request(app)
      .get("/api/rates?base=CZK&currency=EUR%2CGBP%2CUSD");
    expect(res.status).to.equal(200);
  });
  it("should return status 400", async () => {
    let res = await chai.request(app).get("/api/rates");
    expect(res.status).to.equal(400);
  });
});
