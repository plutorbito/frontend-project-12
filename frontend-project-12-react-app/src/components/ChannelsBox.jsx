import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewChannel,
  setActiveChannel,
  renameChannel,
  removeChannel,
} from '../slices/channelsSlice.js';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import NewChannelModal from './Modals/NewChannelModal.jsx';
import RenameChannelModal from './Modals/RenameChannelModal.jsx';
import RemoveChannelModal from './Modals/RemoveChannelModal.jsx';
import { socket } from '../socket.js';
import { useTranslation } from 'react-i18next';

const ChannelsBox = () => {
  const { channels, activeChannelId } = useSelector(
    (state) => state.channelsReducer
  );
  console.log('channels in channelbox', channels, activeChannelId);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(addNewChannel(payload));
      dispatch(setActiveChannel(payload.id));
      console.log('socket new channel', payload);
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
      console.log('socket rename channel', payload);
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
      dispatch(setActiveChannel(channels[0].id));
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
        <NewChannelModal />
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable ? (
              <Dropdown
                as={ButtonGroup}
                className="d-flex"
                onClick={() => dispatch(setActiveChannel(channel.id))}
              >
                <Button
                  type="button"
                  key={channel.id}
                  className="w-100 rounded-0 text-start text-truncate"
                  variant={channel.id === activeChannelId ? 'secondary' : null}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle
                  split
                  className="flex-grow-0"
                  variant={channel.id === activeChannelId ? 'secondary' : null}
                >
                  <span className="visually-hidden">?</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <RenameChannelModal />
                  <RemoveChannelModal />
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                type="button"
                id={channel.id}
                className={'w-100 rounded-0 text-start text-truncate'}
                onClick={() => dispatch(setActiveChannel(channel.id))}
                variant={channel.id === activeChannelId ? 'secondary' : null}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
