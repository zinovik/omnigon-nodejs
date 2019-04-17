const http = require('http');
const indexRouter = require('./routes');
const stockRouter = require('./routes/stock');
const errors = require('./errors');
const logger = require('./logger');

const port = process.env.PORT || 5000;

http.createServer(async (req, res) => {
  const [, route] = req.url.split('/');

  switch (route) {
    case 'stock':
      await stockRouter(req, res);
      break;
    case '':
      await indexRouter(req, res);
      break;
    default:
      await errors.badRequest(req, res);
  }

  logger.addRequest(req, res)
    .catch(console.log);

}).listen(port, function () {
  console.log(`server start at port ${port}`);
});
