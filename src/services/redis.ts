import { createClient } from "redis";

class RedisService {
  private static instance: RedisService;
  private client;
  private initialized = false;

  private constructor() {
    this.client = createClient({
      url: process.env.INTERNAL_REDIS_URL,
    });
    this.client.on("error", (err) => console.error("Redis Client Error", err));
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  private async init() {
    if (!this.initialized) {
      await this.client.connect();
      await this.client.sendCommand(["CONFIG", "SET", "maxmemory", "25mb"]);
      await this.client.sendCommand([
        "CONFIG",
        "SET",
        "maxmemory-policy",
        "allkeys-lru",
      ]);

      const maxMemory = await this.client.sendCommand(["CONFIG", "GET", "maxmemory"]);
      console.log("Redis max memory configured:", maxMemory);
      this.initialized = true;
    }
  }

  async get(key: string) {
    await this.init();
    return await this.client.get(key);
  }

  async set(key: string, value: string, expireInSeconds = 86400) {
    await this.init();
    await this.client.set(key, value, { EX: expireInSeconds });
  }

  async getMemoryInfo() {
    await this.init();
    return await this.client.info("memory");
  }

  async getMemoryStats() {
    await this.init();
    return await this.client.sendCommand(["MEMORY", "STATS"]);
  }

  async getKeyMemoryUsage(key: string) {
    await this.init();
    return await this.client.sendCommand(["MEMORY", "USAGE", key]);
  }

  async deleteKey(key: string) {
    await this.init();
    return await this.client.del(key);
  }

  async cleanUp() {
    await this.init();
    return await this.client.flushAll();
  }
}

export const redisCache = RedisService.getInstance();