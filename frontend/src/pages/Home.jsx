import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { getUser } from "../api/auth";
import { deleteNote, getAllNotes, pinNote, searchNotes } from "../api/note";

import { isTokenValid } from '../utils/authentication';
import { handleError } from '../utils/handleError';

import AddNoteImg from '../assets/add-note.svg';
import NoResultsImg from '../assets/no-results.svg';

import AddEditNoteModal from '../components/AddEditNoteModal';
import EmptyPage from '../components/EmptyPage';
import FullNote from '../components/FullNote';
import NavBar from '../components/NavBar';
import NoteCard from '../components/NoteCard';
import Toast from '../components/Toast';



const Home = () => {
  const [openAddEditModal, setAddEditModal] = useState({
    show: false,
    type: "add",
    data: null
  });

  const [viewNote, setViewNote] = useState({
    show: false,
    data: null
  });

  const [showToast, setShowToast] = useState({
    show: false,
    type: "add",
    message: ""
  });

   const handleShowToast = (type, message) => {
    setShowToast({
      show: true,
      type: type,
      message: message
    });
  }

  const handleCloseToast = () => {
    setShowToast({
      show: false,
      message: ""
    })
  }

  const handlePreview = (note) => {
    console.log("entered handle preview");
    setViewNote({ show: true, data: note });
  };

  const closePreview = () => {
    setViewNote({ show: false, data: null });
  }

  const onClose = () => {
    setAddEditModal({show: false, type: "add", data: null});
  }

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // update pinned state of note
  const handlePinNote = async (noteId, isPinned) => {
    try {
      await pinNote(noteId, isPinned);
      await handleGetAllNotes();
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleEdit = (note) => {
    setAddEditModal({show: true, type: 'edit', data: note});
  }

  // delete selected note
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      handleShowToast("delete", "Note Deleted Successfully");
      await handleGetAllNotes();
    } catch (error) {
      console.log(error.response);
    }
  }

  // get logged in user
  const handleGetUser = useCallback(async () => {
    try {
      const response = await getUser();
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      handleError(error, navigate);
    }
  }, [navigate]);

  // get all of user's notes
  const handleGetAllNotes = useCallback(async () => {
    try {
      const response = await getAllNotes();
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      handleError(error);
    }
  }, []);

  // search for notes containing search query
  const handleSearchNotes = async (query) => {
    try {
      const response = await searchNotes(query);
      if (response.data && response.data.matchingNotes) {
        setIsSearch(true);
        setAllNotes(response.data.matchingNotes);
      }
    } catch (error) {
      handleError(error);
    }
  }

  const clearSearch = async () => {
    setIsSearch(false);
    await handleGetAllNotes();
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // no token or token is expired, need to login again
    if (!accessToken || !isTokenValid(accessToken)) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      await handleGetUser();
      await handleGetAllNotes();
    };

    fetchData();
    return () => {};
  }, [navigate, handleGetUser, handleGetAllNotes]);

  return (
    <>
      <NavBar userInfo={userInfo} searchNotes={handleSearchNotes} clearSearch={clearSearch}/>
      <div className="container mx-auto">
        {allNotes.length > 0 ? (<div className="grid grid-cols-3 gap-4 mt-10">
          {allNotes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={new Date(note.createdOn).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              pinNote={() => {handlePinNote(note._id, note.isPinned)}}
              editNote={() => handleEdit(note)}
              deleteNote={() => {handleDeleteNote(note._id)}}
              onPreview={() => handlePreview(note)}
            />
          ))}
        </div>) : (<EmptyPage imgSrc={isSearch ? NoResultsImg : AddNoteImg } message={isSearch ? "Oops! Your search did not match any notes." : "Add your first note! Click the '+' button at the bottom right corner to start recording your thoughts, ideas, and reminders."}/>)}
      </div>
      <button className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {setAddEditModal({show: true, type: "add", data: null})}}>
        <MdAdd className="text-white" size={25}/>
      </button>
      <AddEditNoteModal isOpen={openAddEditModal.show} note={openAddEditModal.data} type={openAddEditModal.type} onClose={onClose} getAllNotes={handleGetAllNotes} handleShowToast={handleShowToast}/>
      {viewNote.show && <FullNote note={viewNote.data} onClose={closePreview}/>}
      <Toast isShown={showToast.show} type={showToast.type} message={showToast.message} onClose={handleCloseToast}/>
    </>
  )
}

export default Home;
