import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import { useGetChannelsQuery, useGetMessagesQuery } from '../api.js';
import getModal from './Modals/index.js';
import { setModalInfo } from '../slices/modalsSlice.js';

const renderModal = ({ modalInfo, closeModal, channelsResponsData }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component closeModal={closeModal} channels={channelsResponsData} />;
};

const ChatPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const modalInfo = useSelector((state) => state.modalsReducer);

  const openModal = (type) => dispatch(setModalInfo({ type }));

  const closeModal = () => dispatch(setModalInfo({ type: null }));

  const {
    data: channelsResponsData,
    isError: channelsResponseIsError,
    isLoading: channelsResponseIsLoading,
  } = useGetChannelsQuery();

  useEffect(() => {
    if (channelsResponseIsError) {
      toast.error(t('chatPage.getChannelsError'));
    }
  }, [
    channelsResponsData,
    channelsResponseIsError,
    t]);

  const {
    data: messagesResponseData,
    isError: messagesResponseIsError,
    isLoading: messagesResponseIsLoading,
  } = useGetMessagesQuery();

  useEffect(() => {
    if (messagesResponseIsError) {
      toast.error(t('chatPage.getMessagesError'));
    }
  }, [
    messagesResponseData,
    messagesResponseIsError,
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
            <ChannelsBox openModal={openModal} channels={channelsResponsData} />
            <MessagesBox
              messages={messagesResponseData}
              channels={channelsResponsData}
            />
            {renderModal({ modalInfo, closeModal, channelsResponsData })}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
