import { Router } from "express";
import blogsController from "../controllers/blogsController";

const blogsRouter = Router();

blogsRouter.get("/", blogsController.getBlogs);
blogsRouter.post("/", blogsController.createBlog);

export default blogsRouter;
