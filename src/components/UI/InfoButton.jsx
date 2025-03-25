import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const InfoButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={() => setModalIsOpen(true)}
        className="px-4 py-2 bg-clr-dark-blue text-white rounded-lg shadow-md hover:bg-clr-blue"
      >
        Access Information
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg w-80 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">Users in the DB</h2>
        <ul className="space-y-2">
          <li>
            <strong>Usuario 1:</strong> user1@example.com <br />
            <strong>Contraseña:</strong> password123
          </li>
          <li>
            <strong>Usuario 2:</strong> user2@example.com <br />
            <strong>Contraseña:</strong> password456
          </li>
        </ul>
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default InfoButton;
