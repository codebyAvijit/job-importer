const fetchJobs = require("../jobs/fetchJobs");
const jobQueue = require("../queues/jobQueue");

const triggerImport = async (req, res) => {
  const jobs = await fetchJobs();
  await jobQueue.add("importJobs", { jobs });
  res
    .status(200)
    .json({ message: "Jobs queued for import", count: jobs.length });
};

module.exports = { triggerImport };
