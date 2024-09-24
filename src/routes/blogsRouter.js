const { Router } = require("express");
const blogsController = require("../controllers/blogsController");
const middleware = require("../utils/middleware");
const blogsRouter = Router();

blogsRouter.get("/", blogsController.getBlogs);
blogsRouter.post("/", middleware.userExtractor, blogsController.createBlog);
blogsRouter.delete("/:id", middleware.userExtractor, blogsController.deleteBlog);
blogsRouter.put("/:id", blogsController.likeBlog);

module.exports = blogsRouter;
