var express = require("express");
var router = express.Router();

// var { engine } = require("./torrentStream");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("getting request");
  res.render("index", {
    title: "Express",
  });
});

router.get("/test.mkv", function (req, res, next) {
  var torrentStream = require("torrent-stream");

  let mg_link =
    "magnet:?xt=urn:btih:BB4DE8704CF9E6C37C8EBDCB9EC7AF804EFA5B94&dn=Ms.Marvel.S01E02.720p.WEB.x265-MiNX%5BTGx%5D&tr=udp%3A%2F%2F185.193.125.139%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fmovies.zsw.ca%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.0x.tf%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce";

  var engine = torrentStream(`magnet:${mg_link}`);
  try {
    console.log("engine run=========");
    engine.on("ready", function () {
      // console.log("We are ready======", engine.files);

      var stream = engine.files[0].createReadStream();
      stream.on("data", (data) => {
        console.log("are we here yet?");
        res.send(data);
        stream.destroy()
      });

      // console.log();
      // stream is readable stream to containing the file content
    });
  } catch (e) {
    res.json({
      name: "Error Occured:" + e.message,
    });
    console.log(e);
  }
});

module.exports = router;
