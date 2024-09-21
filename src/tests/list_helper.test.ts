import { IBlog } from "../utils/types";
import { test } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper";

test("dummy returns one", () => {
  const blogs: IBlog[] = [];
  const result = listHelper.dummy(blogs);

  assert.strictEqual(result, 1);
});
