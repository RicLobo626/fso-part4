const app = require("./app.js");
const config = require("./utils/config.js");
const logger = require("./utils/logger.js");
const db = require("./utils/db.js");

const init = async () => {
  await db.connect();

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

init();
