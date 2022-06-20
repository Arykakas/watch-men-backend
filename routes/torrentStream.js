var torrentStream = require("torrent-stream");

let mg_link =
  "magnet:?xt=urn:btih:BB4DE8704CF9E6C37C8EBDCB9EC7AF804EFA5B94&dn=Ms.Marvel.S01E02.720p.WEB.x265-MiNX%5BTGx%5D&tr=udp%3A%2F%2F185.193.125.139%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fmovies.zsw.ca%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.0x.tf%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce";

var engine = torrentStream(`magnet:${mg_link}`);

engine.on("ready", function () {
  console.log(engine.torrent.info.files.map((item) => item.path[0].toString()));
  engine.files.forEach(function (file) {
    console.log("filename:", file);
    var stream = file.createReadStream();

    stream.on("data", (data) => {});
    // console.log();
    // stream is readable stream to containing the file content
  });
});
