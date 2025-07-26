const express = require("express");
const { triggerImport } = require("../controllers/importController");
const router = express.Router();

router.post("/import", triggerImport);

module.exports = router;
