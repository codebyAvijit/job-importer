const axios = require("axios");
const xml2js = require("xml2js");

const urls = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
];

const fetchJobs = async () => {
  let allJobs = [];
  const parser = new xml2js.Parser({ explicitArray: false });

  for (const url of urls) {
    try {
      const res = await axios.get(url);
      const json = await parser.parseStringPromise(res.data);
      const jobs = json.rss.channel.item.map((item) => ({
        jobId: item.guid,
        title: item.title,
        company: item["job:company"] || "",
        location: item["job:location"] || "",
        description: item.description,
        url: item.link,
      }));
      allJobs = allJobs.concat(jobs);
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
    }
  }

  return allJobs;
};

module.exports = fetchJobs;
