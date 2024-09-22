import { ethers } from "ethers";
import { z } from "zod";

export const mintTokenRequestDtoSchema = z.object({
  address: z.string().refine((data) => ethers.isAddress(data), {
    message: "Address is not a valid account address",
  }),
  name: z.string(),
  description: z.string(),
  asset: z.instanceof(Blob)
});

export type MintTokenRequestDto = z.infer<typeof mintTokenRequestDtoSchema>;
