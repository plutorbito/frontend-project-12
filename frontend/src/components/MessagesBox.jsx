import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewMessageForm from './NewMessageForm';
import { getActiveChannelName } from '../utils/getChannelsData';

const MessagesBox = ({ messages, channels }) => {
  const { activeChannelId } = useSelector(
    (state) => state.channelsReducer,
  );

  const { t } = useTranslation();

  const messagesToRender = messages.filter(
    (message) => message.channelId === activeChannelId,
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {getActiveChannelName(channels, activeChannelId)}
            </b>
          </p>
          <span className="text-muted">
            {`${messagesToRender.length} ${t('newMessageForm.messageCount', {
              count: messages.length,
            })}`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesToRender.map((message) => (
            <div key={message.id}>
              <b>{message.user}</b>
              :
              {` ${message.body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-4">
          <NewMessageForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
