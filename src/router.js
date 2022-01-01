const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/candidate",controller.addCandidate);
router.get("/candidate",controller.listCandidate);
router.post("/candidate/login",controller.candidateLogin);

router.post("/recruiter",controller.addRecruiter);
router.get("/recruiter",controller.listRecruiter);
router.post("/recruiter/login",controller.recruiterLogin);

module.exports = router