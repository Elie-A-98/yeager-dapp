import { Server } from "./app/server.js";
import { AppBuilder } from "./appBuilder.js";
import { loadConfig } from "./configLoader.js";
import { createLogger } from "./logger/logger.js";

async function start() {
  // load config
  const config = await loadConfig();

  // create startup logger
  const logger = createLogger(config);

  // build internal app services
  const appBuilder = new AppBuilder(config);

  // connect to external systems
  await appBuilder.connectToNetwork().catch((err) => {
    logger.log("error", err);
    throw err;
  });

  // create server
  const server = new Server(appBuilder);

  process.on("SIGTERM", async () => {
    logger.log("warn", "SIGTERM received, stopping server");
    await server.stop();
    process.exit(0);
  });
  process.on("unhandledRejection", (r, p) => {
    logger.log("warn", "Unhandled rejection: ", p);
    process.exit(1);
  });
  await server.start();
}

start();
