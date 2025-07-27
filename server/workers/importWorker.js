const { Worker } = require("bullmq");
const { createClient } = require("redis");
const mongoose = require("mongoose");
const Redis = require("ioredis");
require("dotenv").config({ path: "../.env" });

const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, // 🔧 THIS IS REQUIRED by BullMQ
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Worker connected to Mongo");
});

const worker = new Worker(
  "importQueue", // 🔁 make sure this matches your Queue name in jobQueue.js
  async (job) => {
    const { jobs } = job.data;
    console.log(jobs);
    let newJobs = 0,
      updatedJobs = 0,
      failedJobs = 0;
    const failedReasons = [];

    for (const j of jobs) {
      try {
        const jobId = typeof j.jobId === "object" ? j.jobId._ : j.jobId;
        const existing = await Job.findOne({ jobId });

        if (existing) {
          await Job.updateOne({ jobId }, j);
          updatedJobs++;
        } else {
          await Job.create({ ...j, jobId });
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
