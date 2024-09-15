import { Server } from "./app/server.js";
import { AppBuilder } from "./appBuilder.js";

(async () => {
  const appBuilder = new AppBuilder();
  const server = new Server(appBuilder);
  // const server = new Server(config, logger);
  // process.on("SIGTERM", async () => {
  //   logger.warn("SIGTERM received, stopping server");
  //   await server.stop();
  //   process.exit(0);
  // });
  // process.on("unhandledRejection", (r, p) => {
  //   logger.warn("Unhandled rejection: ", p);
  //   process.exit(1);
  // });
  await server.start();
})()