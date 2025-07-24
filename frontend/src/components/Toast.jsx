import { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, type, message, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    }
  }, [onClose]);

  return (
    <div className={`absolute top-20 right-6 ${isShown ? "opacity-100" : "opacity-0 -z-5"}`}>
      <div className={`min-w-52 bg-white rounded-md shadow-2xl before:w-[5px] before:h-full before:absolute before:left-0 before:top-0 before:rounded-l-lg ${type === "delete" ? "before:bg-red-500" : "before:bg-green-500"}`}>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type === "delete" ? "bg-red-50" : "bg-green-50"}`}> {/* circle background for check*/}
            {type === "delete" ? 
              <MdDeleteOutline className="text-xl text-red-500"/> :
              <LuCheck className="text-xl text-green-500"/>
            }
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Toast;
