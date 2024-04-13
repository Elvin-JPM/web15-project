import React from "react";
const AlertDialog = ({ text, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg">
        <p>{text}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
