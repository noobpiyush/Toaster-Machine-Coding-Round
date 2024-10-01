import { useRef, useState } from "react";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

export const ToasterContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const handleClose = (id: number) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];

    setToasts((prevToasts) => {
       const filteredArr = prevToasts.filter((toast) => {
        return toast.id !== id
       })
       return filteredArr;
    });
  };

  const handleAdd = (
    message: string,
    type: "success" | "info" | "warning" | "error"
  ) => {
    const id = new Date().getTime();
    const newToast = {id,message,type};
    setToasts((prevToasts) => [...prevToasts, newToast]);

    timersRef.current[id] = setTimeout(() => handleClose(id), 5000)
  };

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message} <span onClick={() => handleClose(toast.id)}>X</span>
          </div>
        ))}
      </div>
      <div className="btn-container">
        <button onClick={()=>handleAdd("Success Toast", "success")}>Success Toast</button>
        <button onClick={()=>handleAdd("Warning Toast", "warning")}>Warning Toast</button>
        <button onClick={()=>handleAdd("Info Toast", "info")}>Info Toast</button>
        <button onClick={()=>handleAdd("Error Toast", "warning")}>Error Toast</button>
      </div>
    </div>
  );
};
