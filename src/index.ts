import app from "./app";
import config from "./utils/config";
import logger from "./utils/logger";
import { connectToDB } from "./utils/db";

const init = async () => {
  await connectToDB();

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

void init();
