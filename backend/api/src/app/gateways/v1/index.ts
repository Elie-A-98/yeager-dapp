import { Router } from "express"
import mint from "./mint/index.js";

export default ()=>{
    const router = Router();
    router.use('/mint', mint())
    return router;
}