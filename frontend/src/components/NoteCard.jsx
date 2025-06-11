import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md';

const NoteCard = ({title, date, content, tags, isPinned, pinNote, editNote, deleteNote}) => {
  return (
    <div className="relative w-full h-35 px-5 py-3 mb-4 text-sm rounded shadow hover:shadow-xl hover:shadow-slate-300 outline-none">
      <button className="cursor-pointer absolute top-3 right-3" onClick={pinNote}><MdOutlinePushPin className={`${isPinned ? 'text-blue-500' : 'text-slate-300'}`} size={15}/></button>
      <div className="h-full flex flex-col justify-center space-y-2">
        <h6 className="text-sm font-medium">{title}</h6>
        <p className="text-xs text-slate-500">{date}</p>
        <p className="text-nowrap">{content?.slice(0, 60)}</p>
        <div className="text-xs text-slate-500">{tags}</div>
      </div>
      <button className="absolute right-8 bottom-3 cursor-pointer" onClick={editNote}><MdCreate className="text-slate-300 hover:text-green-600"/></button>
      <button className="absolute right-3 bottom-3 cursor-pointer" onClick={deleteNote}><MdDelete className="text-slate-300 hover:text-red-500"/></button>
    </div>
  )
}

export default NoteCard;
