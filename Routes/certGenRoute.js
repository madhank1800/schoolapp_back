const express = require("express");
const router = express.Router();
const {
  certGen
} = require("../Controllers/certGenCtrl");
//const { authHandler } = require("../Middlewares/userErrorHandler/authHandler");
router.post("/create", certGen);

module.exports = router;
