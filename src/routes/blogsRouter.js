const { Router } = require("express");
const blogsController = require("../controllers/blogsController");

const blogsRouter = Router();

blogsRouter.post("/", blogsController.createBlog);
blogsRouter.get("/", blogsController.getBlogs);
blogsRouter.put("/:id", blogsController.likeBlog);
blogsRouter.delete("/:id", blogsController.deleteBlog);

module.exports = blogsRouter;
