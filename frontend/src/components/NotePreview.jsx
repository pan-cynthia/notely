import { IoMdClose } from "react-icons/io";
import { useEffect, useRef } from 'react';

const NotePreview = ({ note, onClose }) => {
  const drawerRef = useRef();

  // close side drawer
  useEffect(() => {
    const handleInteraction = (e) => {
      if (e.type === 'keydown' && e.key === 'Escape') { // esc key pressed
        onClose();
      }

      if (e.type === 'mousedown' && drawerRef.current && !drawerRef.current.contains(e.target)) { // clicked outside of drawer
        onClose();
      }
    }

    document.addEventListener('keydown', handleInteraction); // listen for keypress
    document.addEventListener('mousedown', handleInteraction); // listen for mouseclick outside of side drawer

    return () => {
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    }
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] z-40" />
      <div className="absolute top-0 right-0 w-[500px] h-full bg-white rounded shadow-lg z-50" ref={drawerRef}>
        <div className="flex flex-col h-full p-5">
          <button className="absolute top-5 right-3 mr-2 text-slate-500 cursor-pointer hover:text-black" onClick={onClose}>
            <IoMdClose className="text-xl"/>
          </button>
          <h2 className="mb-4 text-xl font-semibold">{note.title}</h2>
          <p className="mb-4 text-xs text-slate-500">{new Date(note.createdOn).toLocaleDateString()}</p>
          <p className="flex-1 overflow-y-auto text-sm">{note.content}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-slate-600 text-xs">
            {note.tags.map((tag, index) => (
              <span className="px-2 py-1 bg-slate-100 rounded" key={index}>#{tag}</span>
            ))}
          </div>
          <button className="mt-6 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded cursor-pointer" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default NotePreview;
