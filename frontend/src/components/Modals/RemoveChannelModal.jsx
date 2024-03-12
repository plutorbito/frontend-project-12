import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelsMutation } from '../../api.js';
import { setActiveChannel } from '../../slices/channelsSlice.js';
import handleResponseError from '../../utils/handleResponseErrors.js';

const RemoveChannelModal = ({ closeModal, channels }) => {
  const { activeChannelId } = useSelector((state) => state.channelsReducer);

  const dispatch = useDispatch();

  const [removeChannels] = useRemoveChannelsMutation();

  const { t } = useTranslation();

  const handleDeleteChannel = async () => {
    const response = await removeChannels(activeChannelId);

    if (response.error) {
      toast.error(t(handleResponseError(response.error)));
    } else {
      dispatch(setActiveChannel(channels[0].id));
      closeModal();
      toast.success(t('channelModals.channelReamoved'));
    }
  };

  return (
    <Modal show onHide={closeModal}>
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
  );
};

export default RemoveChannelModal;
