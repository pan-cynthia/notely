import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {

  return (
    <>
      <div className="flex justify-between items-center w-96 px-4 bg-slate-100 rounded-md">
        <input className="w-full text-xs py-[11px] mr-2 outline-none" type="text" placeholder="Search Notes"/>
        <FaMagnifyingGlass className="text-slate-500 cursor-pointer hover:text-black"/>
      </div>
    </>
  )
}

export default SearchBar