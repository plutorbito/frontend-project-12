const getActiveChannelName = (channels, activeChannelId) => {
  const activeChannel = channels.find(
    (channel) => channel.id === activeChannelId,
  );
  return activeChannel ? activeChannel.name : null;
};

const getChannelNamesArray = (channels) => channels.map((channel) => channel.name);

export { getActiveChannelName, getChannelNamesArray };
