import { Router } from "express"
import mint from "./mint/index.js";
import { UseCases } from "../../../appBuilder.js";

export default (useCases: UseCases)=>{
    const router = Router();
    router.use('/mint-request', mint(useCases))
    return router;
}