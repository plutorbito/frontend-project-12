import { Dropdown, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRemoveChannelsMutation } from '../../api.js';

const RemoveChannelModal = () => {
  const [show, setShow] = useState(false);

  const { activeChannelId } = useSelector((state) => state.channelsReducer);

  const [removeChannels] = useRemoveChannelsMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteChannel = async () => {
    const response = await removeChannels(activeChannelId);
    console.log('submitted channel remove response', response);
    handleClose();
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Удалить</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="danger" onClick={handleDeleteChannel}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannelModal;
