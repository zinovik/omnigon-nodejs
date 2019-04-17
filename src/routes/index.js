const errors = require('../errors');

const indexRouter = (req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.write('Welcome to the stock info server!');
    return res.end();
  }

  errors.badRequest(req, res);
};

module.exports = indexRouter;
