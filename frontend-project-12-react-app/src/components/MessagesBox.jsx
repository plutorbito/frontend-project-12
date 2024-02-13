import { useSelector } from 'react-redux';
import NewMessageForm from './NewMessageForm';

const getActiveChannelName = (channels, activeChannelId) => {
  const activeChannel = channels.find(
    (channel) => channel.id === activeChannelId
  );
  return activeChannel ? activeChannel.name : null;
};

const MessagesBox = () => {
  const { channels, activeChannelId } = useSelector(
    (state) => state.channelsReducer
  );

  const { messages } = useSelector((state) => state.messagesReducer);

  console.log('channels in messagebox', channels, activeChannelId);
  console.log('messages in messagebox', messages);

  const messagesToRender = messages.filter(
    (message) => message.channelId === activeChannelId
  );

  console.log('messages to render', messagesToRender);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {getActiveChannelName(channels, activeChannelId)}</b>
          </p>
          <span className="text-muted">
            {messagesToRender.length} сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesToRender.map((message) => (
            <div key={message.id}>
              <b>{message.user}</b>: {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <NewMessageForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
