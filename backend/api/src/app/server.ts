import express, { Application, Request, Response, NextFunction } from "express";
import { AppBuilder } from "../appBuilder.js";
import cors from "cors";
import helmet from "helmet";
import { BusinessValidationError } from "@yeager/domain/BusinessValidationError.js";
import { UserHavePermissionToMintRule } from "@yeager/domain/minting/rules/UserHavePermissionToMintRule.js";
import { ZodError } from "zod";
import { MulterError } from "multer";
import {ResponseError} from '@yeager/dtos/errorCodes.js'

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
    const createErrResponse = (error: Error): ResponseError => {
      if (error instanceof BusinessValidationError) {
        return {
          code: "BUSINESS_ERROR",
          message: error.message,
        };
      }
      if (error.name === "ZodError") {
        return {
          code: "VALIDATION_ERROR",
          message: (error as ZodError).format()._errors.join(', '),
        };
      }
      if (error instanceof MulterError) {
        return {
          code: "VALIDATION_ERROR",
          message: error.field || '',
        };
      }
      if (this._appBuilder.services.config.NODE_ENV === "Production") {
        return undefined;
      }
      return {
        code: "SERVER",
        ...error,
        //@ts-expect-error this is debugging purposes. the dto used by the ui doesn't need to know about this
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

    this.app.listen(8080, () => {
      // The port should be in sync with the port used in the docker file
      logger.log("info", `server listening on port 80`);
    });
  }

  async stop() {}
}
