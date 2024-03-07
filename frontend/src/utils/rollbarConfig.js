const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESSTOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

export default rollbarConfig;
