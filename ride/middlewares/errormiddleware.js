const errormiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
  console.error(err.stack);
  return;
};

export default errormiddleware;
