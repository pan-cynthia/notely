import Modal from 'react-modal';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddEditNote from '../components/AddEditNote';
import NavBar from '../components/NavBar';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const [openAddEditModal, setAddEditModal] = useState({
    show: false,
    type: "add",
    data: null
  });

  const onClose = () => {
    setAddEditModal({show: false, type: "add", data: null});
  }

  return (
    <>
      <NavBar/>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-10">
          <NoteCard
            title="Organize Home Office"
            date="Jun 5, 2025"
            content="My home office has become a cluttered mess, making it difficult to find things."
            tags="#Organization"
            isPinned={true}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
          <NoteCard
            title="Start Learning Guitar"
            date="Jun 5, 2025"
            content="Learning to play the guitar has always been a dream of mine."
            tags="#Guitar"
            isPinned={false}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
          <NoteCard
            title="Try New Recipe"
            date="Jun 5, 2025"
            content="Cooking is one of my favorite hobbies, and I love experimenting in the kitchen."
            tags="#Cooking"
            isPinned={false}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
          <NoteCard
            title="Plan Weekend Getaway"
            date="Jun 5, 2025"
            content="Start planning a weekend getaway trip to Monterey."
            tags="#Travel"
            isPinned={false}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
        </div>
      </div>
      <button className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {setAddEditModal({show: true, type: "add", data: null})}}>
        <MdAdd className="text-white" size={25}/>
      </button>
      <Modal
        isOpen={openAddEditModal.show}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel="Add/Edit Note"
        className="relative w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNote noteData={openAddEditModal.data} type={openAddEditModal.type} onClose={onClose}/>
      </Modal>
    </>
  )
}

export default Home;
