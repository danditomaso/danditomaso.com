import { MGetCommand, Redis, type SetCommandOptions } from "@upstash/redis";

class RedisClient {
  private client: Redis;

  constructor() {
    this.client = Redis.fromEnv();
    this.client.incr;
  }

  // Method to set a key-value pair with optional expiry
  async set<TData>(
    key: string[],
    value: TData,
    opts?: SetCommandOptions,
  ): Promise<"OK" | TData | null> {
    try {
      const _key = key.join(":");
      if (opts) {
        return this.client.set(_key, value, opts);
      }
      return this.client.set(_key, value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async incr(key: string[]): Promise<number | null> {
    try {
      const result = await this.client.incr(key.join(":"));

      if (result === null || result === undefined) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async decr(key: string[]): Promise<number | null> {
    try {
      const result = await this.client.decr(key.join(":"));
      if (result === null || result === undefined) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Type-safe get method using generics data should be json serializable
  async get<TData extends string | number>(key: string[]): Promise<TData | null> {
    try {
      const result = await this.client.get<TData>(key.join(":"));
      if (result === null || result === undefined) {
        return null;
      }

      // if the result is not a string, avoid trying to JSON parse it and return it as is
      if (typeof result !== "string") {
        return result;
      }

      return JSON.parse(result);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async mget<TData>(keys: string[], keyTransform: (key: string) => string): Promise<TData[]> {
    try {
      // Map keys using the transformation function if provided
      const transformedKeys = keys.map((key) => (keyTransform ? keyTransform(key) : key));
      const data = await this.client.mget(...transformedKeys);

      return data.reduce<TData[]>((acc, value) => {
        if (value !== null && value !== undefined) {
          acc.push(value as TData);
        }
        return acc;
      }, []);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async del(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (error) {
      console.error(error);
      return 0;
    }
  }
}

export { RedisClient };
