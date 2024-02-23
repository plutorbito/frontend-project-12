const handleResponseError = (err, setError, t) => {
  switch (err.status) {
    case 409: {
      setError(t('signup.validation.userExists'));
      break;
    }
    case 401: {
      setError(t('login.validation.authFailed'));
      break;
    }
    case 'FETCH_ERROR': {
      setError(t('errors.network'));
      break;
    }
    case 'PARSING_ERROR': {
      setError(t('errors.post'));
      break;
    }
    default: {
      setError(t('errors.unknown'));
    }
  }
};

export default handleResponseError;
