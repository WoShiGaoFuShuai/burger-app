import React from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "@/components/modal/modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./modal.module.css";

const rootElement = document.getElementById("root");

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  if (!rootElement)
    throw new Error('The element with ID "root" was not found in the DOM.');

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={cl.modal}>
        <div className={cl.header}>
          <p className="text_type_main-large">{title}</p>

          <div className={cl.icon}>
            <CloseIcon onClick={onClose} type="primary" />
          </div>
        </div>

        <div>{children}</div>
      </div>
    </ModalOverlay>,
    rootElement
  );
};

export default Modal;
