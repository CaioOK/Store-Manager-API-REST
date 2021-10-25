const UNPROCESSABLE_ENTITY_422 = 422;
const NOT_FOUND_404 = 404;

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    const error = {
      err: {
        code: 'invalid_data',
        message: err.details[0].message,
      },
    };

    return res.status(UNPROCESSABLE_ENTITY_422).json(error);
  }

  const error = { err };

  if (err.code === 'not_found') {
    return res.status(NOT_FOUND_404).json(error);
  }

  return res.status(UNPROCESSABLE_ENTITY_422).json(error);
};
