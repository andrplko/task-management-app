const tokenStore = () => {
  const tokenContainer = { accessToken: '' };

  const setAccessToken = (token: string) => {
    tokenContainer.accessToken = token;
  };

  const getAccessToken = () => {
    return tokenContainer.accessToken;
  };

  const removeAccessToken = () => {
    tokenContainer.accessToken = '';
  };

  return { setAccessToken, getAccessToken, removeAccessToken };
};

export const { setAccessToken, getAccessToken, removeAccessToken } =
  tokenStore();
