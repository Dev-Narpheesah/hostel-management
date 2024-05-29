const errorHandler = (err, req, res, next) => {
  const stausCode = res.stausCode ? res.stausCode : 500;

  res.status(stausCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;