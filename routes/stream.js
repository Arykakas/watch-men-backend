var express = require("express");
var router = express.Router();
const fs = require("fs");
// import { torrentMgStream } from "./torrentStream";

const torrentStream = require("./torrentStream");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/stream", async function (req, res, next) {
  if (!req.query.mglink) {
    ctx.staus = 404;
    ctx.body = "Magnetic link required";
    return;
  } else {
    console.log("req header===", req.query.mglink);
    const range = req.headers.range;
    try {
      const streamResp = await torrentStream.torrentMgStream(
        req.query.mglink,
        range
      );
      // console.log("response", streamResp);
      const { stream, headers } = streamResp;
      res.writeHead(206, headers);
      if (stream) stream.pipe(res);
    } catch (e) {
      console.log("error", e.message);
    }
  }
});

module.exports = router;
