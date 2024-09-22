import { Router } from "express";
import { UseCases } from "../../../../appBuilder.js";
import multer from "multer";
import { mintTokenRequestDtoSchema } from "@yeager/dtos/mintTokenDto.js";
import { Blob } from "buffer";

export default (useCases: UseCases) => {
  const router = Router();
  const upload = multer({
    fileFilter(req, file, callback) {
      if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)){
        return callback(
          new multer.MulterError(
            "LIMIT_UNEXPECTED_FILE",
            "Invalid file type. Only JPEG, PNG, and GIF files are allowed."
          )
        );
      }

      callback(null, true)
    },
    limits:{
      fileSize: 5 * 1024 * 1024,
    }
  });
  router.post("/", upload.single("asset"), async (req, res, next) => {
    try {
      const {
        file,
        body: { name, description, address },
      } = req;
      if(!file){
        return next(new multer.MulterError('LIMIT_UNEXPECTED_FILE', ''))
      }
      const data = mintTokenRequestDtoSchema.parse({
        address,
        name,
        description,
        asset: new Blob([file.buffer]),
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
