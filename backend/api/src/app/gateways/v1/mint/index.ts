import { Router } from "express"
import { UseCases } from "../../../../appBuilder.js";

export default (useCases: UseCases)=>{
    const router = Router();
    router.post('/', async (req, res)=>{
        await useCases.mintToken.execute({ address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" });
        res.send("Minted!!");
    })
    return router;
}