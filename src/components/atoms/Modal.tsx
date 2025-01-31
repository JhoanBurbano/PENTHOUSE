'use client';

import { Cancel01Icon } from "hugeicons-react";
import React, { useCallback, useEffect, useRef, memo, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Modal = memo(({ 
  children, 
  open, 
  onClose,
  title,
  maxWidth = 'md',
  className = ''
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);


  const handleClose = useCallback(() => {

    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
    
  }, [onClose]);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  }, [handleClose]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    const body = document.body;

    if (open) {
      setIsClosing(false);
      body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleEsc, handleClickOutside]);

  if (!open) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div 
      className="fixed bottom-0 inset-0 bg-black/50 flex items-end justify-end md:items-start md:justify-end z-50 h-screen"
      role="presentation"
    >
      <section
        ref={modalRef}
        className={`relative flex flex-col rounded-t-2xl md:rounded-none bg-white shadow-xl w-full h-[80%] md:h-full  ${isClosing ? 'animate-slideUpOut md:animate-slideLeftOut' : 'animate-slideUp md:animate-slideLeft'} transition-transform duration-300 ${maxWidthClasses[maxWidth]} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby="modal-description"
      >
        <header className={`flex-none flex items-center px-4 py-2 border-b ${title ? 'justify-between' : 'justify-end'}`}>
          {title && (
            <h2 id="modal-title" className="text-lg font-semibold uppercase text-center w-full md:w-auto md:text-left">
              {title}
            </h2>
          )}
          <button 
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <Cancel01Icon size={20} className="text-gray-500" />
          </button>
        </header>
        <main id="modal-description" className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </section>
    </div>
  );
});

Modal.displayName = 'Modal';

export default Modal;