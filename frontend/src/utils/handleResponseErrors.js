const handleResponseError = (err) => {
  switch (err.status) {
    case 409: {
      return 'signup.validation.userExists';
    }
    case 401: {
      return 'login.validation.authFailed';
    }
    case 'FETCH_ERROR': {
      return 'errors.network';
    }
    case 'PARSING_ERROR': {
      return 'errors.post';
    }
    default: {
      return 'errors.unknown';
    }
  }
};

export default handleResponseError;
