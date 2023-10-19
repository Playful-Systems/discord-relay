import "dotenv/config"
import { z } from "zod";

const envSchema = z.object({
  ENDPOINT: z.string().url(),
  ENDPOINT_TOKEN: z.string(),
  DISCORD_BOT_KEY: z.string(),
});

export type env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> { }
  }
}