import { Router } from "express";
import v1 from "./v1/index.js";

export default ()=>{
    const router = Router();
    router.use(v1())
    return router;
}