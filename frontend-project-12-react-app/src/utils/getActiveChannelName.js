const getActiveChannelName = (channels, activeChannelId) => {
  const activeChannel = channels.find(
    (channel) => channel.id === activeChannelId
  );
  return activeChannel ? activeChannel.name : null;
};

export default getActiveChannelName;
