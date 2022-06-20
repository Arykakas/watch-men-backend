var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/more", function (req, res, next) {
  res.send("nested routes");
});

module.exports = router;
