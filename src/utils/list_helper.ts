import { IBlog } from "./types";

const dummy = (_blogs: IBlog[]) => 1;

const totalLikes = (blogs: IBlog[]) => {
  return blogs.reduce((acc, { likes }) => acc + likes, 0);
};

export default { dummy, totalLikes };
