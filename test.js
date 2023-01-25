const fs = require("fs");
const bencode = require("bencode");
const sha1 = require("sha-1");
const torrent2magnet = require("torrent2magnet");
// const magGenerator = require("magnet-link-generator");

const torrentUrl = "jalsa-2022-1080p.torrent";

torrent2magnet(torrentUrl, options)
  .then((uri) => {
    console.log(uri);
  })
  .catch((err) => {
    console.error(err);
  });
