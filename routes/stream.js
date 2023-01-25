var express = require("express");
var router = express.Router();

const torrentSearch = require("../services/search");
const torrentStream = require("../services/stream");

router.post("/search", async function (req, res) {
  try {
    if (req.body.search_keyword.length > 0) {
      const torrentSearchResponse = await torrentSearch.getSeachOptions(
        req.body
      );
      res.status(200).send(torrentSearchResponse);
      return null;
    }
    res.status(404).send("Search query is empty");
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/stream", async function (req, res, next) {
  if (!req.query.mglink) {
    res.staus = 404;
    res.body = "Magnetic link required";
    return;
  } else {
    console.log("req header===", req.query.mglink);
    const range = req.headers.range;
    try {
      const streamResp = await torrentStream.torrentMgStream(
        req.query.mglink,
        range
      );
      // console.log("response==", { streamResp });
      const { stream, headers } = streamResp;
      res.writeHead(206, headers);
      stream.pipe(res);
    } catch (e) {
      console.log("error", e.message);
    }
  }
});

module.exports = router;
