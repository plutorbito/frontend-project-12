import { Dropdown, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRemoveChannelsMutation } from '../../api.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RemoveChannelModal = () => {
  const [show, setShow] = useState(false);

  const { activeChannelId } = useSelector((state) => state.channelsReducer);

  const [removeChannels] = useRemoveChannelsMutation();

  const { t } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteChannel = async () => {
    const response = await removeChannels(activeChannelId);
    console.log('submitted channel remove response', response);
    handleClose();
    toast.success(t('channelModals.channelReamoved'));
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        {t('channelModals.deleteDropdown')}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channelModals.removeChannelHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('channelModals.removeChannelBody')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('channelModals.cancelButton')}
          </Button>
          <Button variant="danger" onClick={handleDeleteChannel}>
            {t('channelModals.deleteButton')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannelModal;
