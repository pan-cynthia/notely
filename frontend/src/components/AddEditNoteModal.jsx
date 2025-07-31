import Modal from 'react-modal';

import AddEditNote from "./AddEditNote";

const AddEditModal = ({ isOpen, note, type, onClose, getAllNotes, handleShowToast }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
      contentLabel="Add or Edit Note"
      className="relative w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-24 p-5 overflow-scroll">
      <AddEditNote note={note} type={type} onClose={onClose} getAllNotes={getAllNotes} handleShowToast={handleShowToast}/>
    </Modal>
  )
}

export default AddEditModal;
