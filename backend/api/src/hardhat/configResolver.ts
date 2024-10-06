import { z } from 'zod'

type Environment = 'Development' | 'Production'

const configSchema = z.object({
    url: z.string(),
    port: z.number()
})

export const getConfig = async (env: Environment) => {
    const configFile = (await import(`./config.${env}.json`, { assert: { type: "json" } })).default
    return configSchema.parse(configFile)
}