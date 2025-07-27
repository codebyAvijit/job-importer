const fetchJobs = require("../jobs/fetchJobs");
const jobQueue = require("../queues/jobQueue");
const ImportLog = require("../models/ImportLog");

const triggerImport = async (req, res) => {
  const jobs = await fetchJobs();
  await jobQueue.add("importJobs", { jobs });
  return res
    .status(200)
    .json({ message: "Jobs queued for import", count: jobs.length });
};

const getImportLogs = async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ createdAt: -1 }); // latest first
    return res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

module.exports = { triggerImport, getImportLogs };
