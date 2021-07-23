const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server");
const should = chai.should();

chai.use(chaiHttp);

describe("routes test", () => {
  describe("/POST", () => {
    it("should be return 200 status code to post user", () => {
      const userMock = {
        username: "user",
        roomName: "Geral",
        roomId: "1",
      };

      chai
        .request(server)
        .post("/user")
        .send(userMock)
        .end((err, res) => {
          res.should.have.status(200);
        });
    });

    it("should be return 404 status code to not found room", () => {
      const userMock = {
        username: "user",
        roomName: "Wrong room",
        roomId: "999",
      };

      chai
        .request(server)
        .post("/user")
        .send(userMock)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

  describe("/GET routes", () => {
    it("should be return 200 status code to get users route", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should be return 200 status to current session user", (done) => {
      chai
        .request(server)
        .get("/session")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should be return 200 status to rooms list", (done) => {
      chai
        .request(server)
        .get("/rooms")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should be return 404 status to wrong path rooms list", (done) => {
      chai
        .request(server)
        .get("/rooms-wrong")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("/DELETE route", () => {
    it("should be return 200 status code to delete user", (done) => {
      const responseMesage = { msg: "user has been deleted" };

      chai
        .request(server)
        .delete("/:id")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.eql(responseMesage);
          done();
        });
    });
  });
});
