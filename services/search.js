const TorrentSearchApi = require("torrent-search-api");

TorrentSearchApi.enableProvider("ThePirateBay");
const activeProviders = TorrentSearchApi.getActiveProviders();

async function getSeachOptions({ search_keyword }) {
  return await TorrentSearchApi.search(search_keyword, "Video", 20);
}

module.exports = {
  getSeachOptions,
};
