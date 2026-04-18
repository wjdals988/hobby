import { Redis } from "@upstash/redis";

const hasRedisCredentials =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = hasRedisCredentials ? Redis.fromEnv() : null;
