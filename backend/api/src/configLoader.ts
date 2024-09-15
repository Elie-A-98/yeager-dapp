import dotenv from "dotenv";
import { Config, configSchema } from "./config.js";

dotenv.config()

export const loadConfig = (): Config => {
    return configSchema.parse({...process.env, logging: {level: 'info'}});
};