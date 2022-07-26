var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("getting request");
  res.render("index", {
    title: "Express",
  });
});

router.get("/hello", function (req, res, next) {
  console.log("getting request");
  res.send("Hello World!");
});

module.exports = router;
