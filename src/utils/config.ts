import "dotenv/config";

const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI!;

export default {
  PORT,
  MONGODB_URI,
};
