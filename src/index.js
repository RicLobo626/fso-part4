const app = require("./app.js");
const config = require("./utils/config.js");
const logger = require("./utils/logger.js");
const { connectToDB } = require("./utils/db.js");

const init = async () => {
  await connectToDB();

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

init();
