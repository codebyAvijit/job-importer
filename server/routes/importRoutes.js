const express = require("express");
const {
  triggerImport,
  getImportLogs,
} = require("../controllers/importController");

const router = express.Router();

router.post("/import", triggerImport);
router.get("/logs", getImportLogs);

module.exports = router;
