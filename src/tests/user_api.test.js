const { test, after, describe, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const db = require("../utils/db");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

before(async () => {
  await db.connect();
});

describe("when there is initially one user in the DB", () => {
  beforeEach(async () => {
    await helper.resetUsersInDB();
  });

  describe("adding a new user", () => {
    test("succeeds with valid data", async () => {
      const usersAtStart = await helper.getUsersInDB();

      const newUser = {
        name: "Ricky Martin",
        username: "ricky",
        password: "password123",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.getUsersInDB();

      assert(usersAtEnd.length === usersAtStart.length + 1);
      assert(usersAtEnd.some((u) => u.username === newUser.username));
    });

    test("fails with status code 400 and proper error message if password is invalid", async () => {
      const usersAtStart = await helper.getUsersInDB();

      const newUser = {
        name: "Bob Smith",
        username: "bob",
        password: "pa",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)
        .expect({ error: "Password must be at least 3 characters long" });

      const usersAtEnd = await helper.getUsersInDB();

      assert(usersAtEnd.length === usersAtStart.length);
    });

    test("fails with status code 400 and proper error message if username is invalid", async () => {
      const usersAtStart = await helper.getUsersInDB();

      const newUser = {
        name: "Tony Stark",
        username: "to",
        password: "pw123",
      };

      const data = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.getUsersInDB();

      assert(data.body.error.includes("User validation failed"));
      assert(usersAtEnd.length === usersAtStart.length);
    });

    test("fails with status code 400 and proper error message if username is not unique", async () => {
      const usersAtStart = await helper.getUsersInDB();

      const newUser = {
        name: "John Doe",
        username: "johnny",
        password: "password",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.getUsersInDB();
      assert(usersAtEnd.length === usersAtStart.length);
    });
  });
});

after(async () => {
  await db.disconnect();
});
