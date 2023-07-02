// Custom middleware for successful response
const sendSuccessResponse = (req, res, message, data, statusCode = 200) => {
  const response = {
    message: message,
    success: true,
    statuscode: statusCode,
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

// Custom middleware for error response
const sendErrorResponse = (req, res, message) => {
  return res.status(400).json({
    message: message,
    success: false,
    statuscode: 400,
  });
};
const pageNotFound = (req, res, message) => {
  return res.status(404).json({
    message: message,
    success: false,
    statuscode: 404,
  });
};
const serverErrorHandler = (req, res, message) => {
  return res.status(500).json({
    message: message,
    success: false,
    statuscode: 500,
  });
};
const unauthorisedRequest = (req, res, message) => {
  return res.status(401).json({
    message: message,
    success: false,
    statuscode: 401,
  });
};
const permissionUnauthorisedRequest = (req, res, message) => {
  return res.status(401).json({
    message: message,
    success: false,
    statuscode: 401,
  });
};
module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  pageNotFound,
  serverErrorHandler,
  unauthorisedRequest,
  permissionUnauthorisedRequest,
};
