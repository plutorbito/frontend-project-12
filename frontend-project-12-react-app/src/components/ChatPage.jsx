import { useDispatch } from 'react-redux';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import { useGetChannelsQuery, useGetMessagesQuery } from '../api.js';
import { Spinner } from 'react-bootstrap';

const ChatPage = () => {
  const dispatch = useDispatch();

  const channelsResponse = useGetChannelsQuery();

  if (channelsResponse.isSuccess) {
    console.log(channelsResponse.data);
    dispatch(setChannels(channelsResponse.data));
    dispatch(setActiveChannel(channelsResponse.data[0].id));
  }

  const messagesResponse = useGetMessagesQuery();
  if (messagesResponse.isSuccess) {
    console.log(messagesResponse.data);
    dispatch(setMessages(messagesResponse.data));
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {channelsResponse.isLoading || messagesResponse.isLoading ? (
          <div className="d-flex">
            <Spinner animation="grow" />
            <span style={{ marginLeft: '0.5rem' }}>Loading...</span>
          </div>
        ) : (
          <>
            <ChannelsBox />
            <MessagesBox />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
