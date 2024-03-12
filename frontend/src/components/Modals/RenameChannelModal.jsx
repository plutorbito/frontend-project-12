import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getActiveChannelName, getChannelNamesArray } from '../../utils/getChannelsData.js';
import { validateChannel } from '../../utils/validate.js';
import { useRenameChannelsMutation } from '../../api.js';
import checkBadWords from '../../utils/checkBadWords.js';
import handleResponseError from '../../utils/handleResponseErrors.js';

const RenameChannelModal = ({ closeModal, channels }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const { activeChannelId } = useSelector((state) => state.channelsReducer);

  const currentChannelName = getActiveChannelName(channels, activeChannelId);

  const [renameChannels] = useRenameChannelsMutation();

  const { t } = useTranslation();

  const handleClose = () => {
    closeModal();
  };

  const channelNamesArray = getChannelNamesArray(channels);

  const formik = useFormik({
    initialValues: {
      name: currentChannelName,
    },
    validationSchema: validateChannel(channelNamesArray, t),
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      const filteredChannel = {
        id: activeChannelId,
        newName: checkBadWords(name),
      };

      const response = await renameChannels(filteredChannel);

      if (response.error) {
        toast.error(t(handleResponseError(response.error)));
      } else {
        toast.success(t('channelModals.channelRenamed'));
        handleClose();
        formik.resetForm();
      }
    },
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channelModals.renameChannelHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="addChannel">
            <Form.Control
              type="text"
              autoFocus
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name}
              ref={inputRef}
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">
              {t('channelModals.channelName')}
            </label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('channelModals.cancelButton')}
            </Button>
            <Button variant="primary" type="submit">
              {t('channelModals.submitButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
