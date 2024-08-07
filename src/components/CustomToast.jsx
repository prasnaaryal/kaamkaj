import React, { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = new Date().getTime();
    setToasts([...toasts, { id, message, type, animateOut: false }]);
    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.map((toast) =>
          toast.id === id ? { ...toast, animateOut: true } : toast
        )
      );
      setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((toast) => toast.id !== id)
        );
      }, 500); // Delay the removal to let the fade-out animation play
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 border-l-4 rounded-lg transition-all duration-500 ${
              toast.animateOut ? "animate-fadeOut" : "animate-fadeIn"
            } ${
              toast.type === "info"
                ? "bg-blue-600 border-blue-900 text-white"
                : toast.type === "success"
                ? "bg-green-600 border-darkGreen text-white"
                : toast.type === "error"
                ? "bg-red-600 border-destructive text-white"
                : "bg-primary text-white"
            }`}
          >
            <p>{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
