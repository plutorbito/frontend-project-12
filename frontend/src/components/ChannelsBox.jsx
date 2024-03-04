import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  addNewChannel,
  renameChannel,
  removeChannel,
} from '../slices/channelsSlice.js';
import socket from '../socket.js';
import RemovableChannelButton from './ChannelsButtons/RemovableChannelButton.jsx';
import UnremovableChannelButton from './ChannelsButtons/UnremovableChannelButton.jsx';

const ChannelsBox = ({ openModal }) => {
  const { channels, activeChannelId } = useSelector(
    (state) => state.channelsReducer,
  );
  console.log('channels in channelbox', channels, activeChannelId);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      console.log('newChannel payload', payload);
      dispatch(addNewChannel(payload));
      console.log('socket new channel', payload);
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
      console.log('socket rename channel', payload);
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
      // dispatch(setActiveChannel(channels[0].id));
      console.log('socket remove channel', payload);
      console.log(activeChannelId);
    });
    return () => {
      socket.off('newChannel');
      socket.off('renameChannel');
      socket.off('removeChannel');
    };
  }, [activeChannelId, channels, dispatch]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelsBox.channels')}</b>
        <Button
          variant=""
          className="p-0 text-primary btn-group-vertical"
          onClick={() => openModal('adding')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable ? (
              <RemovableChannelButton openModal={openModal} channel={channel} />
            ) : (
              <UnremovableChannelButton channel={channel} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
