// jobQueue.js
const { Queue } = require("bullmq");
const Redis = require("ioredis");
require("dotenv").config();
const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

connection.on("connect", () => {
  console.log("✅ Redis Connected from jobQueue.js");
});

connection.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

// Create a BullMQ queue instance
const jobQueue = new Queue("importQueue", {
  connection,
});

module.exports = jobQueue;
