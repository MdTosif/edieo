import request from "supertest";
// import UserRoutes from "./user";
import app from "../../src/index";

describe("signup", () => {
  it("username required", async () => {
    await request(app)
      .post("/user/signup")
      .set("Accept", "application/json")
      .expect((res) => {
        expect(res.text).toBe('"username" is required');
      });
  });

  it("password required", async () => {
    await request(app)
      .post("/user/signup")
      .set("Accept", "application/json")
      .send({
        username: "tosif3",
      })
      // .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.text).toBe('"password" is required');
      });
  });

  it("email required", async () => {
    await request(app)
      .post("/user/signup")
      .set("Accept", "application/json")
      .send({
        username: "tosif3",
        password: "oloddp",
      })
      // .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.text).toBe('"email" is required');
      });
  });
});
