import { Router } from "express";
import { UseCases } from "../../../../appBuilder.js";
import { mintTokenRequestDtoSchema } from "@yeager/application/use-cases/mint-token/dto.js";
import multer from "multer";

export default (useCases: UseCases) => {
  const router = Router();
  const upload = multer();
  router.post("/", upload.single("asset"), async (req, res, next) => {
    try {
      const {
        file,
        body: { name, description, address },
      } = req;
      const data = mintTokenRequestDtoSchema.parse({
        address,
        name,
        description,
        file
      });
      await useCases.mintToken.execute(data).then(() => {
        res.status(200).send();
      });
    } catch (err) {
      next(err);
    }
  });
  return router;
};
