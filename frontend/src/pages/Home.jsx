import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import NavBar from '../components/NavBar';
import NoteCard from '../components/NoteCard';
import EmptyPage from '../components/EmptyPage';
import AddEditNoteModal from '../components/AddEditNoteModal';
import axiosInstance from '../api/axios';
import { isTokenValid } from '../utils/authentication';
import AddNoteImg from '../assets/add-note.svg';
import NoResultsImg from '../assets/no-results.svg';

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
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // update pinned state of note
  const pinNote = async (noteId, isPinned) => {
    try {
      const response = await axiosInstance.put('/notes/pin-unpin-note/' + noteId, {
        isPinned: !isPinned
      });
      getAllNotes();
    } catch (error) {
      console.log(error.response);
    }
  }

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

  // search for notes containing search query
  const searchNotes = async (query) => {
    try {
      const response = await axiosInstance.get('/notes/search-notes/', {
        params: { query }
      });
      if (response.data && response.data.matchingNotes) {
        setIsSearch(true);
        setAllNotes(response.data.matchingNotes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    // no token or token is expired, need to login again
    if (!accessToken || !isTokenValid(accessToken)) {
      localStorage.clear();
      navigate('/login');
      return;
    }

    fetchUser();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} searchNotes={searchNotes} clearSearch={clearSearch}/>
      <div className="container mx-auto">
        {allNotes.length > 0 ? (<div className="grid grid-cols-3 gap-4 mt-10">
          {allNotes.map((note, index) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={new Date(note.createdOn).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              pinNote={() => {pinNote(note._id, note.isPinned)}}
              editNote={() => handleEdit(note)}
              deleteNote={() => {deleteNote(note._id)}}
            />
          ))}
        </div>) : (<EmptyPage imgSrc={isSearch ? NoResultsImg : AddNoteImg } message={isSearch ? "Oops! Your search did not match any notes." : "Add your first note! Click the '+' button at the bottom right corner to start recording your thoughts, ideas, and reminders."}/>)}
      </div>
      <button className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {setAddEditModal({show: true, type: "add", data: null})}}>
        <MdAdd className="text-white" size={25}/>
      </button>
      <AddEditNoteModal isOpen={openAddEditModal.show} noteData={openAddEditModal.data} type={openAddEditModal.type} onClose={onClose} getAllNotes={getAllNotes}/>
    </>
  )
}

export default Home;
