const https = require('https');

const apiUrl = 'https://api.iextrading.com/1.0/stock/';

const makeApiRequest = (stock, route) => {
  const url = `${apiUrl}${stock}/${route}`;

  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        let dataParsed;

        if (data === 'Unknown symbol') {
          reject(data);
        }

        try {
          dataParsed = JSON.parse(data);
        } catch (error) {
          reject(error);
        }

        resolve(dataParsed);
      });

    }).on('error', error => {
      reject(error);
    });
  });
};

const getLatestPrice = (stock) => {
  return makeApiRequest(stock, 'quote')
    .then(response => response.latestPrice);
};

const getLogoUrl = (stock) => {
  return makeApiRequest(stock, 'logo')
    .then(response => response.url);
};

const getLatestNewsUrl = (stock) => {
  return makeApiRequest(stock, 'news/last/1')
    .then(response => response[0].url);
};

module.exports = {
  getLatestPrice,
  getLogoUrl,
  getLatestNewsUrl,
};
