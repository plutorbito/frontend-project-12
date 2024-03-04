import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import { useGetChannelsQuery, useGetMessagesQuery } from '../api.js';
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

  const modalInfo = useSelector((state) => state.modalsReducer);
  console.log('modalInfo', modalInfo);

  const openModal = (type) => dispatch(setModalInfo({ type }));

  const closeModal = () => dispatch(setModalInfo({ type: null }));

  const {
    isSuccess: channelsResponseIsSuccess,
    data: channelsResponsData,
    isError: channelsResponseIsError,
    isLoading: channelsResponseIsLoading,
  } = useGetChannelsQuery();

  useEffect(() => {
    if (channelsResponseIsSuccess) {
      console.log(channelsResponsData);
      dispatch(setChannels(channelsResponsData));
      dispatch(setActiveChannel(channelsResponsData[0].id));
    } else if (channelsResponseIsError) {
      toast.error(t('chatPage.getChannelsError'));
    }
  }, [
    channelsResponsData,
    channelsResponseIsError,
    channelsResponseIsSuccess,
    dispatch,
    t,
  ]);

  const {
    isSuccess: messagesResponseIsSuccess,
    data: messagesResponseData,
    isError: messagesResponseIsError,
    isLoading: messagesResponseIsLoading,
  } = useGetMessagesQuery();

  useEffect(() => {
    if (messagesResponseIsSuccess) {
      console.log(messagesResponseData);
      dispatch(setMessages(messagesResponseData));
    } else if (messagesResponseIsError) {
      toast.error(t('chatPage.getMessagesError'));
    }
  }, [
    messagesResponseData,
    messagesResponseIsError,
    messagesResponseIsSuccess,
    dispatch,
    t,
  ]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {channelsResponseIsLoading || messagesResponseIsLoading ? (
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
