import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({value, onChange, handleSearch, clearSearch}) => {
  return (
    <>
      <div className="flex justify-between items-center w-96 px-4 bg-slate-100 rounded-md">
        <input className="w-full text-xs py-[11px] mr-2 outline-none" type="text" placeholder="Search Notes" value={value} onChange={onChange}/>
        {value && <button className="mr-2 cursor-pointer" onClick={clearSearch}><IoMdClose className="text-xl text-slate-500 hover:text-black"/></button>}
        <button className="cursor-pointer" onClick={handleSearch}><FaMagnifyingGlass className="text-slate-500 hover:text-black"/></button>
      </div>
    </>
  )
}

export default SearchBar;
