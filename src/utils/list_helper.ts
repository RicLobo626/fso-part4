import { IBlog } from "./types";

const dummy = (_blogs: IBlog[]) => 1;

const totalLikes = (blogs: IBlog[]) => {
  return blogs.reduce((acc, { likes }) => acc + likes, 0);
};

const favoriteBlog = (blogs: IBlog[]) => {
  if (blogs.length === 0) return null;

  const { title, author, likes } = blogs.reduce((acc, blog) => {
    return blog.likes > acc.likes ? blog : acc;
  });

  return { title, author, likes };
};

export default { dummy, totalLikes, favoriteBlog };
