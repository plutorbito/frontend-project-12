import NewChannelModal from './NewChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  adding: NewChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
