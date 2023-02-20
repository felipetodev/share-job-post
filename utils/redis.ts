import { Redis } from "@upstash/redis";

export const {
  UPSTASH_REDIS_REST_TOKEN = "",
  UPSTASH_REDIS_REST_URL = ""
} = process.env

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN
})

export async function setUrl(key: string, url: string) {
  await redis.set(`job/${key}`, url);
}

export async function getUrl(key: string) {
  return await redis.get(`job/${key}`) as { data: string };
}
