require("dotenv").config();
const redis = require("./queues/jobQueue");

redis
  .set("test", "hello")
  .then(() => {
    return redis.get("test");
  })
  .then((val) => {
    console.log("🔁 Redis test value:", val);
    redis.quit();
  })
  .catch((err) => {
    console.error("❌ Redis test error", err);
  });
