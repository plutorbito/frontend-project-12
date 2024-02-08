import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.usersPath(), {
          headers: getAuthHeader(),
        });
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching private data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h3 className="text-center mb-4">Chat page</h3>
      <div>{data}</div>
    </>
  );
};

export default ChatPage;
