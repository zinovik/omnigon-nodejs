const iextradingService = require('../../services/iextrading');
const errors = require('../../errors');

const stockRouter = (req, res) => {
  const [, , path, parameters] = req.url.split('/');

  switch (path) {
    default:
      if (req.method === 'GET' && !parameters) {
        return Promise.all([
          iextradingService.getLatestPrice(path),
          iextradingService.getLogoUrl(path),
          iextradingService.getLatestNewsUrl(path),
        ])
          .then(([
            latestPrice,
            logoUrl,
            latestNewsUrl,
          ]) => {
            const response = {
              success: true,
              payload: {
                latestPrice,
                logoUrl,
                latestNewsUrl,
              },
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(response));
            res.end();
          })
          .catch(error => {
            if (error === 'Unknown symbol') {
              return errors.unknownSymbol(req, res);
            }

            return errors.internalError(req, res);
          });
      }

      return errors.badRequest(req, res);
  }
};

module.exports = stockRouter;
