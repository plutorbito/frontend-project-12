import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import { useGetChannelsQuery, useGetMessagesQuery } from '../api.js';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import getModal from './Modals/index.js';
import { setModalInfo } from '../slices/modalsSlice.js';

const renderModal = ({ modalInfo, closeModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component closeModal={closeModal} />;
};

const ChatPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const modalInfo = useSelector((state) => state.ModalsReducer);
  console.log('modalInfo', modalInfo);

  const openModal = (type) => dispatch(setModalInfo({ type }));

  const closeModal = () => dispatch(setModalInfo({ type: null }));

  const channelsResponse = useGetChannelsQuery();
  console.log('channelsResponse', channelsResponse);

  useEffect(() => {
    if (channelsResponse.isSuccess) {
      console.log(channelsResponse.data);
      dispatch(setChannels(channelsResponse.data));
      dispatch(setActiveChannel(channelsResponse.data[0].id));
    } else if (channelsResponse.isError) {
      toast.error(t('chatPage.getChannelsError'));
    }
  }, [
    channelsResponse.data,
    channelsResponse.isError,
    channelsResponse.isSuccess,
    dispatch,
    t,
  ]);

  const messagesResponse = useGetMessagesQuery();
  useEffect(() => {
    if (messagesResponse.isSuccess) {
      console.log(messagesResponse.data);
      dispatch(setMessages(messagesResponse.data));
    } else if (messagesResponse.isError) {
      toast.error(t('chatPage.getMessagesError'));
    }
  }, [
    messagesResponse.data,
    messagesResponse.isError,
    messagesResponse.isSuccess,
    dispatch,
    t,
  ]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {channelsResponse.isLoading || messagesResponse.isLoading ? (
          <div className="d-flex">
            <Spinner animation="grow" />
            <span style={{ marginLeft: '0.5rem' }}>
              {t('chatPage.loading')}
            </span>
          </div>
        ) : (
          <>
            <ChannelsBox openModal={openModal} />
            <MessagesBox />
            {renderModal({ modalInfo, closeModal })}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;