import { useCallback, useEffect, useState } from "react";

import { ToastContext } from "../context/ToastContext";

import { setToastHandler } from "../utils/toastNotifier";

import Toast from "../components/Toast";

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState({
    show: false,
    type: "add",
    message: "",
  });

  const handleShowToast = useCallback((type, message) => {
    if (!message || message.trim() === "") return;
    setShowToast({
      show: true,
      type: type,
      message: message,
    });
  }, []);

  const handleCloseToast = useCallback(() => {
    setShowToast({
      show: false,
      type: "add",
      message: "",
    });
  }, []);

  useEffect(() => {
    setToastHandler(handleShowToast);
  }, [handleShowToast]);

  return (
    <ToastContext.Provider value={{ handleShowToast }}>
      {children}
      <Toast
        isShown={showToast.show}
        type={showToast.type}
        message={showToast.message}
        onClose={handleCloseToast}
      />
    </ToastContext.Provider>
  );
};
