import { z } from 'zod'

const metaDataSchema = z.object({
  name: z.string(),
  description: z.string(),
  uri: z.string()
})

export type Metadata = z.infer<typeof metaDataSchema>

export const getMetadataFromUri = (uri: string) =>
  fetch(`${import.meta.env.VITE_PINATA_GATEWAY_URL}/${uri}`).then(async (res) => {
    const metadata = (await res.json()) as Metadata
    metaDataSchema.parse(metadata)
    return metadata
  })

export const getImageUrlFromMetadata = (metaData: Metadata) =>
  `${import.meta.env.VITE_PINATA_GATEWAY_URL}/${metaData.uri.split('ipfs://')[1]}`
