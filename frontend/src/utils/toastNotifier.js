let toastHandler = null;

export const setToastHandler = (fn) => {
  toastHandler = fn;
};

export const showGlobalToast = (type, message) => {
  if (typeof toastHandler === "function") {
    toastHandler(type, message);
  }
};
