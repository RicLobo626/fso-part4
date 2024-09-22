const { Router } = require("express");
const blogsController = require("../controllers/blogsController");

const blogsRouter = Router();

blogsRouter.get("/", blogsController.getBlogs);
blogsRouter.post("/", blogsController.createBlog);
blogsRouter.delete("/:id", blogsController.deleteBlog);

module.exports = blogsRouter;
