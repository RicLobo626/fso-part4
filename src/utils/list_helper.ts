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

const mostBlogs = (blogs: IBlog[]) => {
  if (blogs.length === 0) return null;

  const blogCountMap: Record<string, number> = {};

  let authorWithMostBlogs: IBlog["author"] = blogs[0].author;

  blogs.forEach((blog) => {
    blogCountMap[blog.author] = (blogCountMap[blog.author] || 0) + 1;

    if (blogCountMap[blog.author] > blogCountMap[authorWithMostBlogs]) {
      authorWithMostBlogs = blog.author;
    }
  });

  return {
    author: authorWithMostBlogs,
    blogs: blogCountMap[authorWithMostBlogs],
  };
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs };
