const fs = require('fs');

const addRequest = (req, res) => {

  const date = new Date;
  const dateFormatted = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/')
    + ' '
    + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

  const log = `${req.url},${dateFormatted},${res.statusCode === 200 ? 'success' : 'fail'}\n`;

  return new Promise((resolve, reject) => {
    fs.appendFile(__dirname + '/../../logs/requests.txt', log, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
};

module.exports = {
  addRequest,
};
