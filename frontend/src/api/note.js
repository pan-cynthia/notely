import axiosInstance from "./axiosInstance";

export const addNote = (note) => {
  return axiosInstance.post("/notes/add-note", {
    title: note.title,
    content: note.content,
    tags: note.tags,
  });
};

export const editNote = (noteId, title, content, tags) => {
  return axiosInstance.put(`/notes/edit-note/${noteId}`, {
    title,
    content,
    tags,
  });
};

export const pinNote = (noteId, isPinned) => {
  return axiosInstance.put(`/notes/pin-unpin-note/${noteId}`, {
    isPinned: !isPinned,
  });
};

export const deleteNote = (noteId) => {
  return axiosInstance.delete(`/notes/delete-note/${noteId}`);
};

export const getAllNotes = () => {
  return axiosInstance.get("/notes/get-all-notes");
};

export const searchNotes = (query) => {
  return axiosInstance.get("/notes/search-notes", {
    params: { query },
  });
};
