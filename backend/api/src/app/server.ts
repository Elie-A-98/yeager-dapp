import express, { Application, Request, Response, NextFunction } from "express";
import { AppBuilder } from "../appBuilder.js";
import cors from "cors";
import helmet from "helmet";
import { BusinessValidationError } from "@yeager/domain/BusinessValidationError.js";
import { UserHavePermissionToMintRule } from "@yeager/domain/minting/rules/UserHavePermissionToMintRule.js";
import { ZodError } from "zod";

export class Server {
  private _appBuilder: AppBuilder;
  private app: Application;
  constructor(appBuilder: AppBuilder) {
    this._appBuilder = appBuilder;
    this.app = express();

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(this._appBuilder.gateways);

    // error formatter - TODO: refactor to be modular
    const createErrResponse = (error: Error) => {
      if (error instanceof BusinessValidationError) {
        return {
          code: "BUSINESS_ERROR",
          message: error.message,
        };
      }
      if (error.name === "ZodError") {
        return {
          code: "VALIDATION_ERROR",
          message: (error as ZodError).issues,
        };
      }
      if (this._appBuilder.services.config.NODE_ENV === "Production") {
        return {};
      }
      return {
        ...error,
        stack: error.stack,
      };
    };

    // handler for validation errors errors
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent || !(err.name === "ZodError")) {
          return next(err);
        }
        res.status(400);
        res.json(createErrResponse(err));
      }
    );

    // handler for business errors
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent || !(err instanceof BusinessValidationError)) {
          return next(err);
        }
        if (err._rule instanceof UserHavePermissionToMintRule) {
          res.status(401);
        } else {
          res.status(409);
        }

        res.json(createErrResponse(err));
      }
    );

    // default handler
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        this._appBuilder.services.logger.log("error", err);
        if (res.headersSent) {
          return next(err);
        }
        res.status(500).json(createErrResponse(err));
      }
    );
  }

  async start() {
    const config = this._appBuilder.services.config;
    const logger = this._appBuilder.services.logger;

    logger.log("info", "Starting server");
    logger.log("info", "NODE_ENV: ", config.NODE_ENV);

    this.app.listen(Number(config.PORT), () => {
      logger.log("info", `server listening on port ${config.PORT}`);
    });
  }

  async stop() {}
}
