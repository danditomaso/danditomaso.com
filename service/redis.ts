import { MGetCommand, Redis, type SetCommandOptions } from "@upstash/redis";

class RedisClient {
  private client: Redis;

  constructor() {
    this.client = Redis.fromEnv();
    this.client.incr
  }

  // Method to set a key-value pair with optional expiry
  async set<TData>(
    key: string,
    value: TData,
    opts?: SetCommandOptions,
  ): Promise<"OK" | TData | null> {

    if (opts) {
      return this.client.set(key, value, opts);
    }
    return this.client.set(key, value);
  }

  async incr(
    key: string[],
  ): Promise<number | null> {
    const result = await this.client.incr(key.join(":"));

    if (result === null || result === undefined) {
      return null;
    }
    return result;
  }

  async decr(
    key: string[],
  ): Promise<number | null> {
    const result = await this.client.decr(key.join(":"));
    if (result === null || result === undefined) {
      return null;
    }
    return result;
  }

  // Type-safe get method using generics data should be json serializable
  async get<TData extends string | number>(
    key: string[],
  ): Promise<TData | null> {
    const result = await this.client.get<TData>(key.join(":"));
    if (result === null || result === undefined) {
      return null;
    }

    // if the result is not a string, avoid trying to JSON parse it and return it as is
    if (typeof result !== "string") {
      return result;
    }

    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }


  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }
}

export { RedisClient };
