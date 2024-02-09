import axios from 'axios';
import React, { useEffect } from 'react';
import routes from '../routes.js';
import { useSelector, useDispatch } from 'react-redux';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

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
      } catch (error) {
        console.error('Error fetching private data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const channels = useSelector((state) => state.channelsReducer);
  console.log(channels);

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
