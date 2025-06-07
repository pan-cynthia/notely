import { IoMdClose } from "react-icons/io";

const AddEditNote = ({onClose}) => {
  return (
    <>
      <IoMdClose className="absolute top-5 right-3 mr-2 text-xl text-slate-500 cursor-pointer hover:text-black" onClick={onClose}/>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-900">TITLE</label>
        <input className="text-xl outline-none" type="text" placeholder="Title"></input>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs text-slate-900">CONTENT</label>
        <textarea className="p-2 text-sm text-slate-900 bg-slate-50 rounded outline-none" type="text" placeholder="Content" rows={10}></textarea>
      </div>
      <div className="mt-3">
        <label className="text-xs text-slate-900">TAGS</label>
      </div>
      <button className="w-full p-3 mt-5 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer">ADD</button>
    </>
  )
}

export default AddEditNote