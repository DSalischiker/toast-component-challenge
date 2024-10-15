import React from "react";

import useEscapeKey from "./../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = React.useState("");
  const [toastVariant, setToastVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);

  
  const removeToast = (id) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  };

  const submitToast = (event) => {
    event.preventDefault();
    
    if (message === "") {
      return;
    }

    const newToast = {
      id: crypto.randomUUID(),
      message: message,
      variant: toastVariant,
    };
    setToasts([...toasts, newToast]);
    setMessage("");
    setToastVariant("notice");
  };

  const removeAllToasts = () => {
    setToasts([]);
  }
  
  useEscapeKey("Escape", removeAllToasts);
  
  const value = {
    message,
    setMessage,
    toastVariant,
    setToastVariant,
    toasts,
    removeToast,
    submitToast,
  };
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  )
}

export default ToastProvider;
