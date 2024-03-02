const handleSignupAndLoginResponse = (
  response,
  logIn,
  setError,
  navigate,
  location,
) => {
  logIn();
  setError('');
  const userId = {
    token: response.data.token,
    username: response.data.username,
  };
  localStorage.setItem('userId', JSON.stringify(userId));
  navigate(location.state?.from || '/');
};

export default handleSignupAndLoginResponse;
