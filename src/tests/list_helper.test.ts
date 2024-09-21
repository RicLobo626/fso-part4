import { IBlog } from "../utils/types";
import { describe, test } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper";
import { Types } from "mongoose";

describe("list helper", () => {
  const blogs: IBlog[] = [
    {
      id: new Types.ObjectId(),
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      id: new Types.ObjectId(),
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      id: new Types.ObjectId(),
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      id: new Types.ObjectId(),
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      id: new Types.ObjectId(),
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      id: new Types.ObjectId(),
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    },
  ];

  const listWithOneBlog: IBlog[] = [
    {
      id: new Types.ObjectId(),
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    },
  ];

  test("dummy returns one", () => {
    const blogs: IBlog[] = [];
    const result = listHelper.dummy(blogs);

    assert.strictEqual(result, 1);
  });

  describe("total likes", () => {
    test("of empty list is zero", () => {
      const result = listHelper.totalLikes([]);
      assert.strictEqual(result, 0);
    });

    test("when list has only one blog, equals the likes of that", () => {
      const result = listHelper.totalLikes(listWithOneBlog);
      assert.strictEqual(result, listWithOneBlog[0].likes);
    });

    test("of a bigger list is calculated right", () => {
      const result = listHelper.totalLikes(blogs);
      assert.strictEqual(result, 36);
    });
  });

  describe("favorite blog", () => {
    test("of empty list is null", () => {
      const result = listHelper.favoriteBlog([]);
      assert.strictEqual(result, null);
    });

    test("when list has only one blog, equals that blog", () => {
      const result = listHelper.favoriteBlog(listWithOneBlog);

      const { title, author, likes } = listWithOneBlog[0];

      assert.deepStrictEqual(result, { title, author, likes });
    });

    test("of a bigger list is the blog with most likes", () => {
      const result = listHelper.favoriteBlog(blogs);

      const { title, author, likes } = blogs[2];

      assert.deepStrictEqual(result, { title, author, likes });
    });
  });

  describe("most blogs", () => {
    test("of empty list is null", () => {
      const result = listHelper.mostBlogs([]);
      assert.strictEqual(result, null);
    });

    test("when list has only one blog, equals the author of that blog", () => {
      const result = listHelper.mostBlogs(listWithOneBlog);

      const { author } = listWithOneBlog[0];

      assert.deepStrictEqual(result, { author, blogs: 1 });
    });

    test("of a bigger list is the author with most blogs", () => {
      const result = listHelper.mostBlogs(blogs);
      console.log(result);
      assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
    });
  });
});
