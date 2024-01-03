const errorHandler = (err, req, res, next) => {
  //if the status is 200, set it to 500 for internal server error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  //send back a JSON object with the error message
  res.json({
    message: err.message,
    stack: err.stack
  })
}

export default errorHandler;