import { ethers } from "ethers";
import { z } from "zod";

export const mintTokenRequestDtoSchema = z.object({
  address: z.string().refine((data) => ethers.isAddress(data), {
    message: "Address is not a valid account address",
  }),
  name: z.string(),
  description: z.string(),
  file: z.object({
    originalname: z.string(),
    mimetype: z
      .string()
      .refine((val) => ["image/jpeg", "image/png", "image/gif"].includes(val), {
        message: "Only JPEG, PNG, or GIF files are allowed",
      }),
    size: z.number().max(1024 * 1024 * 5, "File size must be less than 5MB"), // Limit to 5MB
    buffer: z.instanceof(Buffer)
  }),
});

export type MintTokenRequestDto = z.infer<typeof mintTokenRequestDtoSchema>;
