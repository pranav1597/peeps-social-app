// redis.ts
import { createClient } from "redis";

// Create the Redis client with proper connection settings
const redisClient = createClient({
  url: "redis://localhost:6380", // Use your actual Redis server URL
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Use async connect to establish the connection
async function connectRedis() {
  try {
    await redisClient.connect(); // Connect to Redis server
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
}

connectRedis();

export default redisClient;
