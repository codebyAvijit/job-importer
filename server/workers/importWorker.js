const { Worker } = require("bullmq");
const { createClient } = require("redis");
const mongoose = require("mongoose");
require("dotenv").config();

const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");

const connection = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Worker connected to Mongo");
});

const worker = new Worker(
  "job-importer",
  async (job) => {
    const { jobs } = job.data;

    let newJobs = 0,
      updatedJobs = 0,
      failedJobs = 0;
    const failedReasons = [];

    for (const j of jobs) {
      try {
        const existing = await Job.findOne({ jobId: j.jobId });

        if (existing) {
          await Job.updateOne({ jobId: j.jobId }, j);
          updatedJobs++;
        } else {
          await Job.create(j);
          newJobs++;
        }
      } catch (err) {
        failedJobs++;
        failedReasons.push(err.message);
      }
    }

    await ImportLog.create({
      totalFetched: jobs.length,
      newJobs,
      updatedJobs,
      failedJobs,
      failedReasons,
    });
  },
  { connection }
);
