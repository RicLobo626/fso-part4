const { test, after, describe, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const db = require("../utils/db");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  before(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    await helper.resetBlogsInDB();
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    assert(response.body.every((b) => b.id));
  });

  describe("addition of a new blog", () => {
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "Created by a test",
        author: "Test",
        url: "http://testblogs.com",
        likes: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.getBlogsInDB();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      assert(blogsAtEnd.some((b) => b.title === "Created by a test"));
    });

    test("will default likes to 0 if field is missing", async () => {
      const newBlog = {
        title: "Testing default likes",
        author: "Test",
        url: "http://testblogs.com",
      };

      await api.post("/api/blogs").send(newBlog);

      const blogsAtEnd = await helper.getBlogsInDB();

      const blog = blogsAtEnd.find((b) => b.title === "Testing default likes");

      assert.strictEqual(blog.likes, 0);
    });

    test("will respond with 400 if title or url are missing", async () => {
      const newBlog = {
        author: "Test",
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.getBlogsInDB();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.getBlogsInDB();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
      assert(!blogsAtEnd.some((b) => b.id === blogToDelete.id));
    });

    test("responds with 204 if blog does not exist", async () => {
      const nonExistingId = helper.getNonExistingId();

      await api.delete(`/api/blogs/${nonExistingId}`).expect(204);
    });
  });

  describe("liking a blog", () => {
    test("succeeds with status code 200 if id is valid", async () => {
      const blogsAtStart = await helper.getBlogsInDB();
      const blogToLike = blogsAtStart[0];

      await api
        .put(`/api/blogs/${blogToLike.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.getBlogsInDB();
      const likedBlog = blogsAtEnd.find((b) => {
        return b.id.toString() === blogToLike.id.toString();
      });

      assert.strictEqual(likedBlog.likes, blogToLike.likes + 1);
    });

    test("responds with 404 if blog does not exist", async () => {
      const nonExistingId = helper.getNonExistingId();

      await api.put(`/api/blogs/${nonExistingId}/like`).expect(404);
    });
  });
});

after(async () => {
  await db.disconnect();
});
