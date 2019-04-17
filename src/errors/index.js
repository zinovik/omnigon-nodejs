const errorResponse = (req, res, statusCode, message) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({
    error: {
      code: statusCode,
      message,
    }
  }));
  res.end();
};

const badRequest = (req, res) => {
  errorResponse(req, res, 400, 'Bad Request!');
};

const internalError = (req, res) => {
  errorResponse(req, res, 500, 'Internal Error!');
};

const unknownSymbol = (req, res) => {
  errorResponse(req, res, 404, 'Unknown Symbol!');
};

module.exports = {
  badRequest,
  internalError,
  unknownSymbol,
};
