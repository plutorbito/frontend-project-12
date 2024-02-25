import { Dropdown } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import getActiveChannelName from '../../utils/getActiveChannelName.js';
import { validateChannel } from '../../utils/validate.js';
import { useRenameChannelsMutation } from '../../api.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import checkBadWords from '../../utils/checkBadWords.js';

const RenameChannelModal = () => {
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const inputRef = useRef(null);

  const { channels, activeChannelId } = useSelector(
    (state) => state.channelsReducer
  );
  console.log('channels in rename channel', channels, activeChannelId);

  const currentChannelName = getActiveChannelName(channels, activeChannelId);
  console.log('currentChannelName', currentChannelName);

  const [renameChannels] = useRenameChannelsMutation();

  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    setError('');
    formik.resetForm();
  };
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      name: currentChannelName,
    },
    onSubmit: async ({ name }) => {
      try {
        const channelNamesArray = channels.map((channel) => channel.name);
        await validateChannel(name, channelNamesArray);
        const filteredChannel = {
          id: activeChannelId,
          newName: checkBadWords(name),
        };
        console.log(filteredChannel);

        const response = await renameChannels(filteredChannel);
        console.log('submitted channel rename response', response);

        toast.success(t('channelModals.channelRenamed'));
        setError('');
        handleClose();
        formik.resetForm();
      } catch (err) {
        setError(err.message);
      }
      inputRef.current.focus();
    },
  });

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        {t('channelModals.renameDropdown')}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channelModals.renameChannelHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="addChannel">
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                isInvalid={error}
                ref={inputRef}
              />

              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleClose}
              >
                {t('channelModals.cancelButton')}
              </Button>
              <Button variant="primary" type="submit">
                {t('channelModals.submitButton')}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannelModal;
