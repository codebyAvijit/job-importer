const { Queue } = require("bullmq");
const { createClient } = require("redis");

const connection = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const jobQueue = new Queue("job-importer", { connection });

module.exports = jobQueue;
