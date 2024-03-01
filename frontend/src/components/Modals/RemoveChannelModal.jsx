import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRemoveChannelsMutation } from '../../api.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RemoveChannelModal = ({ closeModal }) => {
  const { activeChannelId } = useSelector((state) => state.channelsReducer);

  const [removeChannels] = useRemoveChannelsMutation();

  const { t } = useTranslation();

  const handleDeleteChannel = async () => {
    const response = await removeChannels(activeChannelId);
    console.log('submitted channel remove response', response);
    closeModal();
    toast.success(t('channelModals.channelReamoved'));
  };

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channelModals.removeChannelHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('channelModals.removeChannelBody')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
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