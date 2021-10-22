const UNPROCESSABLE_ENTITY_422 = 422;

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

  return res.status(UNPROCESSABLE_ENTITY_422).json(error);
};
