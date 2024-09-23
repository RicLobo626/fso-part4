const { Router } = require("express");
const blogsController = require("../controllers/blogsController");
const middleware = require("../utils/middleware");
const blogsRouter = Router();

blogsRouter.get("/", blogsController.getBlogs);
blogsRouter.post("/", middleware.tokenDecoder, blogsController.createBlog);
blogsRouter.put("/:id", middleware.tokenDecoder, blogsController.likeBlog);
blogsRouter.delete("/:id", middleware.tokenDecoder, blogsController.deleteBlog);

module.exports = blogsRouter;
