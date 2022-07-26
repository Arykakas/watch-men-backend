var torrentStream = require("torrent-stream");

const torrentMgStream = async (mglink, range) => {
  console.log("start the engine");
  var engine = torrentStream(`magnet:${mglink}`);
  let headers = "";
  let stream = "";
  try {
    const enginStream = await engine.on("ready", async function () {
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

      stream = await engine.files[2].createReadStream({ start, end });
    });
    if (headers || stream) {
      console.log("enginStream", stream);
    }
    return enginStream;
  } catch (e) {
    console.log("Error at torrentStream", e.message);
    return {
      name: "Error Occured:" + e.message,
    };
  }
};

module.exports = {
  torrentMgStream,
};
