var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/more.mp4", function (req, res, next) {
  var torrentStream = require("torrent-stream");

  let mg_link =
    "magnet:?xt=urn:btih:6283D001E15C7447B1DB5F8B9074BF5A3A75FC12&dn=Seduce%20Your%20Dad%20Type%208%20%5BPorn%20Pros%202022%5D%20XXX%20WEB-DL%20SPLIT%20SCENES&tr=udp%3A%2F%2F185.193.125.139%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fmovies.zsw.ca%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.0x.tf%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce";

  var engine = torrentStream(`magnet:${mg_link}`);
  try {
    engine.on("ready", function () {
      console.log("We are ready======", engine.torrent.info);
      const info = engine.torrent.info;
      let fileSize = -1;
      info.files.forEach((file) => {
        const fileName = file.path.toString().split(".");
        const length = file.path.toString().split(".").length;
        console.log("fileName===", fileName, length);
        if (file.path.toString().split(".")[length - 1] === "mp4") {
          fileSize = file.length;
        }
      });

      // const fileSize = fs.statSync('/Users/kan/Downloads/video.mp4').size;

      console.log(req.headers.range);

      const range = req.headers.range;
      console.log("range", req.headers);
      const start = Number(range.replace(/\D/g, "")) || 0;
      const chunk_size = 10 ** 6; // 1 mb

      console.log(
        "start, chunk_size, fileSize : ",
        start,
        chunk_size,
        fileSize
      );

      const end = Math.min(start + chunk_size, fileSize - 1);

      const contentLength = end - start + 1;

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      console.log("headers", headers);
      var stream = engine.files[3].createReadStream({ start, end });
      // var stream = fs.createReadStream('/Users/kan/Downloads/video.mp4', { start, end });

      res.writeHead(206, headers);

      stream.pipe(res);
    });
  } catch (e) {
    res.json({
      name: "Error Occured:" + e.message,
    });
    console.log(e);
  }
});

module.exports = router;
