import { useEffect, useState } from "react";
import { LuCheck, LuLogOut } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, type, message, onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isShown) {
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShown]);

  useEffect(() => {
    if (fadeOut) {
      // wait for animation to complete before calling onClose
      const timer = setTimeout(() => {
        onClose();
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [fadeOut, onClose]);

  return (
    <>
      {isShown && message && (
        <div
          className={`fixed top-20 right-6 transition-all duration-500 ease-in-out ${
            isShown && !fadeOut
              ? "opacity-100 z-50 translate-y-0"
              : "opacity-0 -z-5 translate-y-4"
          }`}
        >
          {/* set z-index to neg value, otherwise notecard in same spot cannot be pinned */}
          <div
            className={`min-w-52 bg-white rounded-md shadow-2xl before:w-[5px] before:h-full before:absolute before:left-0 before:top-0 before:rounded-l-lg ${
              type === "delete"
                ? "before:bg-red-500"
                : type === "logout"
                ? "before:bg-blue-500"
                : "before:bg-green-500"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-2">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  type === "delete"
                    ? "bg-red-50"
                    : type === "logout"
                    ? "bg-blue-50"
                    : "bg-green-50"
                }`}
              >
                {" "}
                {/* circle background for check*/}
                {type === "delete" ? (
                  <MdDeleteOutline className="text-xl text-red-500" />
                ) : type === "logout" ? (
                  <LuLogOut className="text-xl text-blue-500" />
                ) : (
                  <LuCheck className="text-xl text-green-500" />
                )}
              </div>
              <p className="text-sm text-slate-800">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
