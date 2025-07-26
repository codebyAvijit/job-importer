const mongoose = require("mongoose");

const ImportLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  totalFetched: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Number,
  failedReasons: [String],
});

module.exports = mongoose.model("ImportLog", ImportLogSchema);
