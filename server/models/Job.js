const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobId: { type: String, unique: true },
    title: String,
    company: String,
    location: String,
    description: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
