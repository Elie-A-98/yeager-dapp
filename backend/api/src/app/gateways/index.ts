import { Router } from "express";
import v1 from "./v1/index.js";
import { UseCases } from "../../appBuilder.js";

export default (useCases: UseCases)=>{
    const router = Router();
    router.use('/api/v1',v1(useCases));
    return router;
}