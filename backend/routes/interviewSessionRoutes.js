const express = require("express");

const {
  createInterview,
  saveAnswer,
  getInterview,
} = require("../controllers/interviewSessionController");

const router = express.Router();

router.post("/create", createInterview);
router.post("/save-answer", saveAnswer);
router.get("/:id", getInterview);

module.exports = router;