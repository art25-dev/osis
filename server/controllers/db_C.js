const { DownloaderHelper } = require('node-downloader-helper');


// Функция получения баз данных
module.exports.getDb = async (req, res) => {
  try {
    const url = 'http://localhost:3000/1.zip'
    const dist = 'F:'
    const dl = new DownloaderHelper(url, dist);

    dl.on('end', () => console.log('Download Completed'))
    dl.start();
    res.status(200).json(dl.getStats())

  } catch (e) {
    res.status(500).json(e)
  }
}


