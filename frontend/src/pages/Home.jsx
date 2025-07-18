import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import AddEditNote from '../components/AddEditNote';
import NavBar from '../components/NavBar';
import NoteCard from '../components/NoteCard';
import axiosInstance from '../api/axios';

const Home = () => {
  const [openAddEditModal, setAddEditModal] = useState({
    show: false,
    type: "add",
    data: null
  });

  const onClose = () => {
    setAddEditModal({show: false, type: "add", data: null});
  }

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();

  const handleEdit = (noteData) => {
    setAddEditModal({show: true, type: 'edit', data: noteData});
  }

  // handle delete note
  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete('/notes/delete-note/' + noteId);
      console.log(response.data); // deleted note successfully
      getAllNotes(); // update screen
    } catch (error) {
      console.log(error.response);
    }
  }

  // get logged in user
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) { // user not found, log out
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  // get all of user's notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes/get-all-notes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    fetchUser();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo}/>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-10">
          {allNotes.map((note, index) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={new Date(note.createdOn).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              pinNote={() => {}}
              editNote={() => handleEdit(note)}
              deleteNote={() => {deleteNote(note._id)}}
            />
          ))}
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
        className="relative w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
        <AddEditNote noteData={openAddEditModal.data} type={openAddEditModal.type} onClose={onClose} getAllNotes={getAllNotes}/>
      </Modal>
    </>
  )
}

export default Home;
