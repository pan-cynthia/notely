import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Tags from './Tags';
import axiosInstance from '../api/axiosInstance';
import { handleError } from '../utils/handleError';

const AddEditNote = ({ note, type, onClose, getAllNotes, handleShowToast }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState(note?.tags || []);
  const [error, setError] = useState(null);

  const addNote = async () => {
    try {
      const response = await axiosInstance.post('notes/add-note', {
        title: title,
        content: content,
        tags: tags
      });
      console.log(response.data.note);
      handleShowToast(type, "Note Added Successfully");
      if (getAllNotes) {
        await getAllNotes(); // re-fetch notes
      }
      onClose(); // close modal after adding new note
    } catch (error) {
      handleError(error);
    }
  }

  const editNote = async () => {
    try {
      const response = await axiosInstance.put('notes/edit-note/' + note._id, {
        title,
        content,
        tags
      })
      console.log(response.data);
      handleShowToast(type, "Note Updated Successfully");
      getAllNotes();
      onClose();
    } catch (error) {
      handleError(error);
    }
  }

  const handleNote = () => {
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    if (!content) {
      setError("Please enter the content.");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNote();
    }
  }
  
  return (
    <>
      <button className="absolute top-5 right-3 mr-2 text-slate-500 cursor-pointer hover:text-black" onClick={onClose}>
        <IoMdClose className="text-xl"/>
      </button>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-900">TITLE</label>
        <input className="text-xl outline-none" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs text-slate-900">CONTENT</label>
        <textarea className="p-2 text-sm text-slate-900 bg-slate-50 rounded outline-none" type="text" placeholder="Content" rows={10} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
      <div className="mt-3">
        <label className="text-xs text-slate-900">TAGS</label>
        <Tags tags={tags} setTags={setTags}/>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <button className="w-full p-3 mt-5 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer" onClick={handleNote}>{type === "add" ? 'ADD' : 'UPDATE'}</button>
    </>
  )
}

export default AddEditNote;
