import { Router } from "express"
import { UseCases } from "../../../../appBuilder.js";

export default (useCases: UseCases)=>{
    const router = Router();
    router.post('/', async (req, res)=>{
        await useCases.mintToken.execute({ address: "asd" });
        res.send("Minted!!");
    })
    return router;
}