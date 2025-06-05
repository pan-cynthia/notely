import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({value, onChange, handleSearch, clearSearch}) => {

  return (
    <>
      <div className="flex justify-between items-center w-96 px-4 bg-slate-100 rounded-md">
        <input className="w-full text-xs py-[11px] mr-2 outline-none" type="text" placeholder="Search Notes" value={value} onChange={onChange}/>
        {value && <IoMdClose className="mr-2 text-xl text-slate-500 cursor-pointer hover:text-black" onClick={clearSearch}/>}
        <FaMagnifyingGlass className="text-slate-500 cursor-pointer hover:text-black" onClick={handleSearch}/>
      </div>
    </>
  )
}

export default SearchBar