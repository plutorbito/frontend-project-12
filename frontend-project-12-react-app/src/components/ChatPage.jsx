import axios from 'axios';
import React, { useEffect } from 'react';
import routes from '../routes.js';
import { useDispatch } from 'react-redux';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import getAuthHeader from '../utils/getAuthHeader.js';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get(routes.channelsPath(), {
          headers: getAuthHeader(),
        });
        const messagesResponse = await axios.get(routes.messagesPath(), {
          headers: getAuthHeader(),
        });

        console.log(channelsResponse);
        console.log(messagesResponse);

        dispatch(setChannels(channelsResponse.data));
        dispatch(setActiveChannel(channelsResponse.data[0].id));
        dispatch(setMessages(messagesResponse.data));
      } catch (error) {
        console.error('Error fetching private data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsBox />
        <MessagesBox />
      </div>
    </div>
  );
};

export default ChatPage;
