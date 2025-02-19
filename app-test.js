process.env.NODE_ENV = "test"; // Set environment to test
let mongoose = require("mongoose");
let server = require("./app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Planets API Suite", () => {
  describe("Fetching Planet Details", () => {
    it("it should fetch a planet named Mercury", (done) => {
      let payload = {
        id: 1,
      };
      chai
        .request(server)
        .post("/planet")
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("id").eql(1);
          res.body.should.have.property("name").eql("Mercury");
          done();
        });
    });
  });
});

//Use below test case to achieve coverage
describe("Testing Other Endpoints", () => {
  describe("it should fetch OS Details", () => {
    it("it should fetch OS details", (done) => {
      chai
        .request(server)
        .get("/os")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("it should fetch Live Status", () => {
    it("it checks Liveness endpoint", (done) => {
      chai
        .request(server)
        .get("/live")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("live");
          done();
        });
    });
  });

  describe("it should fetch Ready Status", () => {
    it("it checks Readiness endpoint", (done) => {
      chai
        .request(server)
        .get("/ready")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("ready");
          done();
        });
    });
  });
});
