import { Dropdown, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannel, setActiveChannel } from '../../slices/channelsSlice.js';

const RemoveChannelModal = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const { channels, activeChannelId } = useSelector(
    (state) => state.channelsReducer
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteChannel = () => {
    dispatch(removeChannel(activeChannelId));
    dispatch(setActiveChannel(channels[0].id));
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
