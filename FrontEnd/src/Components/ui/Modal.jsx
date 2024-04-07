import * as React from "react";
import { createPortal } from "react-dom";
import Button from './Button'

const Modal = ({
  isOpen,
  onClose,
  children,
  width = "max-w-2xl",
}) => {
  if (!isOpen) return null;

  let title,
    content,
    footer = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === ModalTitle) title = child;
      if (child.type === ModalContent) content = child;
      if (child.type === ModalFooter) footer = child;
    }
  });

  return createPortal(
    <div
      className={
        "fixed left-0 right-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-black/50 md:inset-0",
        width !== "w-full" && `p-4`
      }
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className={"min-w-[360px] rounded-lg bg-white shadow", width}>
          <div className="flex items-start justify-between rounded-t p-4">
            {title && (
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            )}
            <Button
              variant={"ghost"}
              className="ml-auto h-8 w-8 p-0 text-gray-400 hover:text-gray-900"
              onClick={onClose}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </Button>
          </div>
          {content && (
            <div className="flex items-start space-y-6 p-4">{content}</div>
          )}
          {footer && (
            <div className="flex items-center space-x-2 p-4">{footer}</div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const ModalTitle = ({ children }) => {
  return <>{children}</>;
};

const ModalContent = ({ children }) => {
  return <>{children}</>;
};

const ModalFooter = ({ children }) => {
  return <>{children}</>;
};

export { Modal, ModalTitle, ModalContent, ModalFooter };
