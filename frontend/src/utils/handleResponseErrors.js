const handleResponseError = (err) => {
  switch (err.status) {
    case 409: {
      return 'signup.validation.userExists';
      // setError(t('signup.validation.userExists'));
      // break;
    }
    case 401: {
      return 'login.validation.authFailed';
      // setError(t('login.validation.authFailed'));
      // break;
    }
    case 'FETCH_ERROR': {
      return 'errors.network';
      // setError(t('errors.network'));
      // break;
    }
    case 'PARSING_ERROR': {
      return 'errors.post';
      // setError(t('errors.post'));
      // break;
    }
    default: {
      return 'errors.unknown';
      // setError(t('errors.unknown'));
    }
  }
};

export default handleResponseError;
