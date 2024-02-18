const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelsPathId: (id) => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
};

export default routes;
