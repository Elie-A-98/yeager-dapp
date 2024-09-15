import express, { Application } from "express";
import { AppBuilder } from "../appBuilder.js";

export class Server {
  private _appBuilder: AppBuilder;
  private app: Application;
  constructor(appBuilder: AppBuilder) {
    this._appBuilder = appBuilder;
    this.app = express();

    this.app.use(this._appBuilder.gateways.mint);
  }

  async start() {
    const config = this._appBuilder.services.config;
    const logger = this._appBuilder.services.logger;

    logger.log('info', "Starting server");
    logger.log("info", "NODE_ENV: ", config.NODE_ENV);

    this.app.listen(Number(config.PORT),()=>{
      logger.log("info", `server listening on port ${config.PORT}`);
    })
  }

  async stop() {}
}
