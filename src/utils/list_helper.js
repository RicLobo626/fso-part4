const dummy = (_blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((acc, { likes }) => acc + likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const { title, author, likes } = blogs.reduce((acc, blog) => {
    return blog.likes > acc.likes ? blog : acc;
  });

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogCountMap = {};

  let authorWithMostBlogs = blogs[0].author;

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

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likeCountMap = {};

  let authorWithMostLikes = blogs[0].author;

  blogs.forEach((blog) => {
    likeCountMap[blog.author] = (likeCountMap[blog.author] || 0) + blog.likes;

    if (likeCountMap[blog.author] > likeCountMap[authorWithMostLikes]) {
      authorWithMostLikes = blog.author;
    }
  });

  return {
    author: authorWithMostLikes,
    likes: likeCountMap[authorWithMostLikes],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
