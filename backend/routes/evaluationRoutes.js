
const express = require("express");

const {
  evaluateAnswer,
} = require("../controllers/evaluationController");

const router = express.Router();

router.post(
  "/evaluate",
  evaluateAnswer
);

module.exports = router;

