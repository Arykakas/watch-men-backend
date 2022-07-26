var torrentStream = require("torrent-stream");

const torrentMgStream = (mglink, range) => {
  return new Promise((resolve, reject) => {
    console.log("start the engine");
    var engine = torrentStream(`magnet:${mglink}`);
    let headers = "";
    let stream = "";
    try {
      engine.on("ready", function () {
        const info = engine.torrent.info;
        let fileSize = -1;

        fileSize = info.files[2].length;
        const start = range ? Number(range.replace(/\D/g, "")) : 0;
        const chunk_size = fileSize;
        const end = Math.min(start + chunk_size, fileSize - 1);

        const contentLength = end - start + 1;

        headers = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };

        stream = engine.files[2].createReadStream({ start, end });
        resolve({ stream, headers });
      });
    } catch (e) {
      console.log("Error at torrentStream", e.message);
      reject({ error: e.message });
    }
  });
};

module.exports = {
  torrentMgStream,
};
