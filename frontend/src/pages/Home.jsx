import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";

import { useToast } from "../hooks/useToast";

import { getUser } from "../api/auth";
import { deleteNote, getAllNotes, pinNote, searchNotes } from "../api/note";

import { autoLogout } from "../utils/authentication";
import { handleError } from "../utils/handleError";

import AddNoteImg from "../assets/add-note.svg";
import NoResultsImg from "../assets/no-results.svg";

import AddEditNoteModal from "../components/AddEditNoteModal";
import EmptyPage from "../components/EmptyPage";
import FullNote from "../components/FullNote";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [openAddEditModal, setAddEditModal] = useState({
    show: false,
    type: "add",
    data: null,
  });

  const [viewNote, setViewNote] = useState({
    show: false,
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const { handleShowToast } = useToast();

  const handleShowModal = () => {
    setAddEditModal({ show: true, type: "add", data: null });
  };

  const handleCloseModal = () => {
    setAddEditModal({ show: false, type: "add", data: null });
  };

  const handleEditNote = (note) => {
    setAddEditModal({ show: true, type: "edit", data: note });
  };

  const handleViewNote = (note) => {
    setViewNote({ show: true, data: note });
  };

  const handleCloseViewNote = () => {
    setViewNote({ show: false, data: null });
  };

  // update pinned state of note
  const handlePinNote = async (noteId, isPinned) => {
    try {
      await pinNote(noteId, isPinned);
      await handleGetAllNotes();
    } catch (error) {
      console.log(error.response);
    }
  };

  // delete selected note
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      handleShowToast("delete", "Note Deleted Successfully");
      await handleGetAllNotes();
    } catch (error) {
      console.log(error.response);
    }
  };

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
  };

  // clear search bar
  const clearSearch = async () => {
    setIsSearch(false);
    await handleGetAllNotes();
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleGetUser();
      await handleGetAllNotes();
    };

    const accessTokenExp = Number(localStorage.getItem("accessTokenExp"));
    const refreshTokenExp = Number(localStorage.getItem("refreshTokenExp"));
    autoLogout(handleShowToast, accessTokenExp, refreshTokenExp);

    fetchData();
  }, [navigate, handleGetUser, handleGetAllNotes, handleShowToast]);

  return (
    <>
      <NavBar
        userInfo={userInfo}
        searchNotes={handleSearchNotes}
        clearSearch={clearSearch}
      />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-10">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={new Date(note.createdOn).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                pinNote={() => {
                  handlePinNote(note._id, note.isPinned);
                }}
                editNote={() => handleEditNote(note)}
                deleteNote={() => {
                  handleDeleteNote(note._id);
                }}
                onPreview={() => handleViewNote(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyPage
            imgSrc={isSearch ? NoResultsImg : AddNoteImg}
            message={
              isSearch
                ? "Oops! Your search did not match any notes."
                : "Add your first note! Click the '+' button at the bottom right corner to start recording your thoughts, ideas, and reminders."
            }
          />
        )}
      </div>
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => handleShowModal()}
      >
        <MdAdd className="text-white" size={25} />
      </button>
      <AddEditNoteModal
        isOpen={openAddEditModal.show}
        note={openAddEditModal.data}
        type={openAddEditModal.type}
        onClose={handleCloseModal}
        getAllNotes={handleGetAllNotes}
      />
      {viewNote.show && (
        <FullNote note={viewNote.data} onClose={handleCloseViewNote} />
      )}
    </>
  );
};

export default Home;
