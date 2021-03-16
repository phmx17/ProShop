const notFound = (req, res, next) => { // land here at the end of route list if none match
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {  // override default error handler by passing err; this will also catch custom error thrown in product routes (product not found)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode // sometimes 200 even through there is an error;
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}
export { notFound, errorHandler }