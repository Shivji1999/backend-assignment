
function responseFormat(statusCode, data, error, message) {
    return {
      statusCode,
      data: {
        data,
      },
      error,
      message,
    };
  }

  module.exports = responseFormat