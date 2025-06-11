import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Tags = ({tags, setTags}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTag();
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      {
        tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="flex items-center justify-center gap-1.5 px-3 py-1 text-sm text-slate-900 bg-slate-100 rounded">
                #{tag}
                <button className="cursor-pointer" onClick={() => removeTag(tag)}>
                  <MdClose/>
                </button>
              </span>
            ))}
          </div>
        )
      }
      <div className="flex items-center gap-4 mt-3">
        <input type="text" className="text-sm shadow shadow-slate-300 px-3 py-2 rounded outline-none" placeholder="Add Tags" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} onKeyDown={handleKeyDown}></input>
        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600" onClick={() => {addTag()}}>
          <MdAdd className="text-lg text-white"/>
        </button>
      </div>
    </>
  )
}

export default Tags;
